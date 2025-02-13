import './ChatPopUp.css';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Avatar, Button, Col, Row,Typography } from 'antd';
import {CloseChatBox, HideChatBox, OpenChatBox } from '../../store/actions/ChatBoxAction';
import Chat from '../../pages/chat';
import { Friend } from '../../pages/chat/type';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { DeleteMessageNotify } from '../../store/actions/MessageNotifyAction';
import WebRTCTest from '../../pages/chat/VideoCall/VideoCall';
const { Title, Text } = Typography;
const ChatPopUp = () => {
  const {isOpen}=useSelector((state:RootState)=>state.chatBoxReducer)
  const {currFriend}=useSelector((state:RootState)=>state.chatBoxReducer);
  const {user}=useSelector((state:RootState)=>state.authReducer);


  const dispatch=useDispatch();
  // Hàm để mở/đóng chatbox

  const toggleChatbox = () => {
    if(isOpen) dispatch(CloseChatBox())
    else{
      const friend:Friend={
        name:currFriend!.name,
        email:currFriend!.email,
        avt:currFriend!.avt,
      }
      dispatch(DeleteMessageNotify({content:"",sendAt:"",sendFrom:currFriend!.email,sendTo:''}))
      dispatch(OpenChatBox({isOpen:true,currFriend:friend}));
    }
  };


  return (
    <div>
      {/* Nút mở chatbox */}
      {
        currFriend&&!isOpen&& 
        <Avatar
          onClick={toggleChatbox}
          className='open-chatbox-btn'
          size={50}
          src={currFriend!.avt} // Thay thế bằng ảnh avatar thật của bạn
        />
      }


      {/* Chatbox container */}
      {isOpen && (
        <div className="chatbox-container">
          <Row align="middle">
            <Col span={3} style={{paddingLeft:5}}>
                <Avatar
                    className='avt'
                    size={40}
                    src={currFriend!.avt} // Thay thế bằng ảnh avatar thật của bạn
                />
            </Col>
            <Col span={13} offset={1}>
              <Title ellipsis={{ tooltip: true }} level={5} style={{ margin: 0 }}>{currFriend!.name}</Title>
              <Text type="secondary">Đang hoạt động</Text>
            </Col>

            <Col span={2}>
              <WebRTCTest emailToCall={currFriend} curremail={user!.email} active={true}></WebRTCTest>
            </Col>

            <Col span={2}  >
              <Button type='link' icon={<MinusOutlined style={{color:"purple"}} rotate={0} spin={false}/>} style={{width:30,zIndex:10}} onClick={()=>dispatch(HideChatBox())}></Button>
            </Col>
            <Col span={2}  >
              <Button type='link' icon={<CloseOutlined style={{color:"purple"}} rotate={0} spin={false}/>} style={{width:30,zIndex:10}} onClick={()=>dispatch(CloseChatBox())}></Button>
            </Col>

          </Row>
          <Row style={{flex:1}}>
            <Chat></Chat>
          </Row>
         
        </div>
      )}
    </div>
  );
};

export default ChatPopUp;
