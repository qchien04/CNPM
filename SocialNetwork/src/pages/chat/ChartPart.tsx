import Stomp from 'stompjs';
import React, {useRef, memo, useEffect, Dispatch, SetStateAction, useState } from 'react';
import { Badge, Button, Col, Form, Image, Input, Row } from 'antd';
import { ArrowRightOutlined, CloseOutlined, PictureFilled } from '@ant-design/icons';
import "./chatpart.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';
import { Friend, Message, Typing } from './type';


type FormSend={
  content:string,
}
type MessageProps = {
  name_send:string,
  message: Message;
  currEmail: string | undefined;
  preMessageEmail:string|null,

};

const MessageContainer = memo(({name_send, message, currEmail,preMessageEmail }: MessageProps) => {
  return (
    <div
      className={(message.send_email === currEmail)||(message.send_email=='Server')? "inner-outgoing" : "inner-incoming"}
    >
      {message.send_email !== currEmail&& message.send_email!='Server' && message.send_email!=preMessageEmail && (
        <div className="inner-name">{name_send}</div>
      )}
      {!message.is_image?
      <div className="inner-content">{message.content}</div>: (
        <Image alt='Đang tải ảnh' preview={true} style={{width:110,height:70,borderRadius: 10}} src={message.content}/>

      )}
    </div>
  );  
});

type prop={
  currFriend:Friend|null,
  active:boolean,
  stompClientState:Stomp.Client | null;
  currMessageList:Message[]
  setCurrMessageList:Dispatch<SetStateAction<Message[]>>,
  isConnect:boolean,
  room_id:number|undefined,
}

const ChatPart:React.FC<prop> = ({isConnect,room_id,currFriend,stompClientState,active,currMessageList,setCurrMessageList}) => {
  const {user}=useSelector((state:RootState)=>state.authReducer);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [form] = Form.useForm();
  console.log(currMessageList)
  const onMessageReceive = (serverRespone: Stomp.Message) => {
    console.log("Received message:", JSON.parse(serverRespone.body));
    const newMessage:Typing=JSON.parse(serverRespone.body)

    if(newMessage.emailSend==currFriend?.email){
        handleTyping(newMessage);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight+100; // Cuộn xuống cuối
    }
  }, [currMessageList]); 

  useEffect(() => {
    if(isConnect&&stompClientState){
      stompClientState.subscribe(`/typing/${user?.email}`, onMessageReceive);
  }
  }, [isConnect,stompClientState]); 

  const handleTyping=(data:Typing)=>{
    const elementListTyping=chatBoxRef.current?.querySelector(".inner-list-typing");
    if(elementListTyping){
      if(data.type == "show"){
        const existTyping = elementListTyping.querySelector(`[user-id="${data.emailSend}"]`);
        if(!existTyping){
          const boxTyping = document.createElement("div");
          boxTyping.classList.add("box-typing");
          boxTyping.setAttribute("user-id", data.emailSend);
          boxTyping.innerHTML = `
            <div class="inner-name">${data.name}</div>
            <div class="inner-dots"><span></span><span></span><span></span></div>
          `;
          elementListTyping?.appendChild(boxTyping);
          if(chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight+100; 
        }
      }else {
        if(elementListTyping){
          const boxTypingDelete = elementListTyping.querySelector(`[user-id="${data.emailSend}"]`);
          if(boxTypingDelete) {
            elementListTyping.removeChild(boxTypingDelete);
          }
        }
      
      }
    }
  }
  const sendMessageToRoom = (values:FormSend) => {
    form.resetFields();
    const newMessage: Message = {
      room_id: room_id,
      send_email: user?.email || "underfind",
      content: values.content || "",
      receive_email: currFriend?.email || "",
      time_send: moment().format("YYYY-MM-DDTHH:mm:ss"),
      is_read: false,
      is_image: !!previewImage, // Đánh dấu tin nhắn là ảnh
      image_url: previewImage || "", // Gửi ảnh nếu có
    };
    if (stompClientState && stompClientState.connected) {
      console.log(newMessage)
      
      if(!previewImage) setCurrMessageList(pre=>[...pre,newMessage])
    
      stompClientState.send("/app/sendMessage", {}, JSON.stringify(newMessage));
      setPreviewImage(null)
    } else {
      console.error("WebSocket is not connected");
    }
  };

  
  const showTyping=()=>{
    let timeOut;
    if (stompClientState && stompClientState.connected) {
      const typing:Typing={
        name:user?user.name:"anh ba xì dầu",
        emailSend:user?user.email:"Vo danh tieu tot",
        type:"show",
        emailReceive:currFriend?.email||"",
      }
      stompClientState.send("/app/typing", {}, JSON.stringify(typing));
      clearTimeout(timeOut);
  
      timeOut = setTimeout(() => {
        const hide={
          name:user?user.name:"anh ba xì dầu",
          emailSend:user?user.email:"Vo danh tieu tot",
          type:"hidden",
          emailReceive:currFriend?.email||"",
        }
        stompClientState.send("/app/typing", {}, JSON.stringify(hide));
    }, 3000);
    } else {
      console.error("WebSocket is not connected");
    }
  }

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
      setPreviewImage(null);
  };

  return (
    <>
    {active?<div className='chatbox'>
        <Row className='message-scroll-part' ref={chatBoxRef}>
          <Col span={24}>
            <div className="innerChatbox" my-id={user?.email}>
              <div className="inner-body" >
                  {currMessageList.map((message, index) => (
                    <MessageContainer name_send={currFriend?.name||""}  key={index} currEmail={user?.email} message={message} 
                    preMessageEmail={index>0?currMessageList[index-1].send_email:null}/>
                  ))}
                <div className="inner-list-typing"/>
              </div>


            </div>
          </Col>


        </Row>
        {previewImage && (
            <Row align={"middle"}>
              <Col span={6} style={{margin:2,width: 50, height: 40,background:"#F2F4F7",
                borderRadius:10,textAlign:"center",paddingTop:1}}>
                  <PictureFilled/> Ảnh đã thêm 
              </Col>
              <Col span={4} offset={1}>
                <Badge count={<Button onClick={handleDeleteImage} style={{borderRadius:"50%",backgroundColor:"white",width: 15, height: 15}}
                                icon={<CloseOutlined style={{width: 8, height: 8}} rotate={0} spin={false}/>}
                              />}
                >
                  <Image src={previewImage} alt="Preview" style={{borderRadius:10, width: 50, height: 50, objectFit: "cover" }} />
                </Badge>
                
              </Col>
            </Row>
          )
        }


        <Row className='form-part'>
          <Col span={24}>
            <Form form={form} onFinish={sendMessageToRoom}>
              <Row align="middle" className='form-send'>
                <Col span={3} offset={1} style={{paddingBottom:6 }}>
                  <Button type='link' icon={<PictureFilled style={{ fontSize: 20 }} />} onClick={() =>{document.getElementById("upload-image")?.click()}} />
                </Col>
                <Col span={13} offset={0}>
                  <Form.Item style={{ marginBottom: 0,paddingBottom:6 }} name="content">
                    <Input
                      type="text"
                      placeholder="Nhập nội dung..."
                      className="input-item"
                      onFocus={showTyping}
                      autoComplete='off'
                    />
                  </Form.Item>

                  <Form.Item name="picture" style={{ display: "none" }}>
                    <Input type="file" accept="image/*" id="upload-image" onChange={handleImageChange} />
                  </Form.Item>
                </Col>
                
                <Col span={4} offset={2} style={{paddingBottom:6 }}>
                  <Button
                    htmlType="submit"
                    icon={<ArrowRightOutlined />}
                    type="primary"
                  />
                </Col>        
              </Row>
            </Form>    
          </Col>
        </Row>
    </div>
      
    :
  
    <></>}
    
    </>
  );
};

export default ChatPart;
