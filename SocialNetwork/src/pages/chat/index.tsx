import { useEffect, useState } from "react";
import { Message } from "./type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import chatService from "../../services/chatService";

import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import ChatPart from "./ChartPart";
// import WebRTCTest from "./VideoCall";




const Chat:React.FC =()=>{
    const [stompClientState, setStompClientState] = useState<Stomp.Client | null>(null);
    const [isConnect,setIsConnect]=useState<boolean>(false);


    const [currMessageList,setCurrMessageList]=useState<Message[]>([]);

    const {currFriend,room_id} = useSelector((state:RootState)=>state.chatBoxReducer);
    const {user}=useSelector((state:RootState)=>state.authReducer);
    
    useEffect(()=>{
        if(currFriend&&isConnect) 
          (async()=>{  
            const getMessageRoomChat=await chatService.getMessageRoom(user?user.email:"None",currFriend?.email||"");
            setCurrMessageList(getMessageRoomChat);
          })() 
    },[currFriend,isConnect])

    useEffect(()=>{
        if(!stompClientState) connect();
    },[])

    useEffect(()=>{
        if(isConnect&&stompClientState?.connected){
            const subscription = stompClientState.subscribe(`/friend/${user?.email}`, onMessageReceive);
            return () => {
                subscription.unsubscribe();
            };
        }
    },[isConnect,stompClientState])

    const onMessageReceive = (serverRespone: Stomp.Message) => {
        const newMessage:Message=JSON.parse(serverRespone.body)
        console.log(newMessage)
        if(newMessage.send_email==currFriend?.email||newMessage.send_email=='Server'){
            console.log("get in side++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            setCurrMessageList(prevMessages => [...prevMessages, newMessage]);
        }
      };

    
    const connect = () => {
        const socket = new SockJS("http://localhost:8080/sockjs");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            setStompClientState(stompClient); // Cập nhật state sau khi kết nối thành công
            setIsConnect(true);
        }, errorCallback);
    };

    const errorCallback = (error: string | Stomp.Frame) => {
        if (typeof error === 'string') {
            console.error("Error socket: " + error);
        } else {
            console.error("Error frame: ", error);
        }
    };

    return(
        <ChatPart   currFriend={currFriend}
                    room_id={room_id}
                    active={currFriend==null?false:true}
                    stompClientState={stompClientState}
                    currMessageList={currMessageList}
                    setCurrMessageList={setCurrMessageList}
                    isConnect={isConnect}
        ></ChatPart>
    );
}

export default Chat;