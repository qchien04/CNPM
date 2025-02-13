import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./videocall.css";
import { Button, Modal } from "antd";
import {VideoCameraFilled} from "@ant-design/icons";
import { Friend } from "../type";


type prop={
  curremail:string,
  emailToCall:Friend|null,
  active:boolean,
}

const WebRTCTest: React.FC<prop> = ({emailToCall,curremail,active}) => {
  const localID = useRef<string>(curremail);
  const remoteID = useRef<string>("");
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const [calling, setCalling] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [hasLocalPeer, setHasLocalPeer] = useState<boolean>(false);
  const [localPeer, setLocalPeer] = useState<RTCPeerConnection | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iceServers: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    const peer = new RTCPeerConnection(iceServers);
    setLocalPeer(peer);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("MediaStream obtained:", stream);
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing media devices:", error));
    setHasLocalPeer(true);
    return () => {
      peer.close();
    };
  }, []);

  useEffect(()=>{
    if(hasLocalPeer){
        connect();
    }
  },[hasLocalPeer])
  useEffect(() => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++")
    if(isConnect) console.log("is connect")
      if(stompClient) console.log("is stompClient")
        if(localStream) console.log("is localStream")
          
          console.log(emailToCall+"+++++++++++++++++++++++++++++++++++++++++++++++++++")
    if (isConnect && stompClient && localStream) {
      stompClient.subscribe(`/topic/${localID.current}/call`, handleIncomingCall);
      stompClient.subscribe(`/topic/${localID.current}/offer`, handleIncomingOffer);
      stompClient.subscribe(`/topic/${localID.current}/answer`, handleIncomingAnswer);
      stompClient.subscribe(`/topic/${localID.current}/candidate`, handleIncomingCandidate);
      stompClient.send("/app/addUser", {}, localID.current);
    }
  }, [isConnect, stompClient,localStream]);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/sockjs2", { debug: false });
    const client = Stomp.over(socket);
    setStompClient(client);
    client.connect({}, (frame) => {
      console.log("Connected video ------------------------------------------------------------------:", frame);
      setIsConnect(true);
    });
  };

  const handleIncomingCall = (message: Stomp.Message) => {
    remoteID.current = message.body;
    console.log("Incoming call from:", remoteID.current);
    setIsModalOpen(true);
  };


  const handleIncomingOffer = (message: Stomp.Message) => {
    const offer = JSON.parse(message.body).offer;

    if (localPeer && localStream) {
      localPeer.setRemoteDescription(new RTCSessionDescription(offer));

      localPeer.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      localPeer.onicecandidate = (event) => {
        if (event.candidate) {
          const candidate = {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.candidate,
          };
          stompClient?.send(
            "/app/candidate",
            {},
            JSON.stringify({
              toUser: remoteID.current,
              fromUser: localID.current,
              candidate,
            })
          );
        }
      };

      localStream.getTracks().forEach((track) => {
        localPeer.addTrack(track, localStream);
      });

      localPeer.createAnswer().then((description) => {
        localPeer.setLocalDescription(description);
        stompClient?.send(
          "/app/answer",
          {},
          JSON.stringify({
            toUser: JSON.parse(message.body).fromUser,
            fromUser: localID,
            answer: description,
          })
        );
      });
    }
  };

  const handleIncomingAnswer = (message: Stomp.Message) => {
    const answer = JSON.parse(message.body).answer;

    if (localPeer) {
      localPeer.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleIncomingCandidate = (message: Stomp.Message) => {
    const candidate = JSON.parse(message.body).candidate;

    const iceCandidate = new RTCIceCandidate({
      sdpMLineIndex: candidate.label,
      candidate: candidate.id,
    });
    localPeer?.addIceCandidate(iceCandidate);
  };

  const acceptCall=()=>{
    setIsModalOpen(false);
    setCalling(true);
    if(localPeer) console.log("co peer")
    if(localStream) console.log("co stream")
    if (localPeer && localStream) {
      console.log("ontrack");
      localPeer.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          console.log("co video")
        }
      };

      localPeer.onicecandidate = (event) => {
        if (event.candidate) {
          const candidate = {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.candidate,
          };
          stompClient?.send(
            "/app/candidate",
            {},
            JSON.stringify({
              toUser: remoteID.current,
              fromUser: localID.current,
              candidate,
            })
          );
        }
      };

      localStream.getTracks().forEach((track) => {
        localPeer.addTrack(track, localStream);
      });
      console.log("start offer");
      localPeer.createOffer().then((description) => {
        localPeer.setLocalDescription(description);
        if(stompClient){
            console.log("ahhahahahah%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        }
        else{
            console.log("ahhahahahah&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        }
        stompClient?.send(
          "/app/offer",
          {},
          JSON.stringify({
            toUser: remoteID.current,
            fromUser: localID.current,
            offer: description,
          })
        );
      });
    }
  }
  const call = () => {
    console.log(emailToCall?.email||"RemoteUnderfind");
    console.log(localID.current);
    setCalling(true)
    stompClient?.send(
      "/app/call",
      {},
      JSON.stringify({
        callTo: emailToCall?.email||"RemoteUnderfind",
        callFrom: localID.current,
      })
    );
  };


  return (
    <>
    <div>
      <div style={{position:"relative",height:40,background:"transparent"}}>
        {active?<Button style={{position:"absolute",color:"black",background:"transparent",top:0,right:0}} type="link" onClick={call} icon={<VideoCameraFilled/>} size="large"></Button>:<></>}
      </div>
      <Modal
        title="Xác nhận hành động"
        open={isModalOpen}
        onOk={acceptCall}
        onCancel={()=>{setIsModalOpen(false)}}
        okText="Đồng ý"
        cancelText="Từ chối"
        width={200}
      >
        <p>{remoteID.current} Muốn gọi cho bạn</p>
      </Modal>
      <div className="videoCall-Container" hidden={!calling} style={{zIndex:10}}>
        <video className="local-video" ref={localVideoRef} autoPlay muted ></video>
        <video className="remote-video" ref={remoteVideoRef} autoPlay ></video>
      </div>
    </div>
    
      
    </>
    
    
  );
};

export default WebRTCTest;
