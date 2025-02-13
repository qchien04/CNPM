import {SearchOutlined, HomeOutlined, TeamOutlined, ShopOutlined, VideoCameraOutlined} from "@ant-design/icons"

import "./TopBar.css";
import {Grid, Col, Menu, MenuProps, Row } from "antd";
import Notify from "../../Components/Notify";
import { Link, Outlet, useLocation } from "react-router-dom";
import Conversation from "../../Components/Chat";
import UserOption from "../../Components/UserOption";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { DeleteMessageNotify, PushMessageNotify } from "../../store/actions/MessageNotifyAction";
import { MessageNotifyResponse } from "../../pages/chat/type";
import { useEffect, useRef } from "react";
import SearchBar from "../../Components/SearchBar";
const { useBreakpoint } = Grid;
interface MenuItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}
const TopBar: React.FC = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const screens = useBreakpoint();
  const dispatch=useDispatch()

  const {user}=useSelector((state:RootState)=>state.authReducer);
  const {currFriend,isOpen}=useSelector((state:RootState)=>state.chatBoxReducer);

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
      if (!user?.email) return; // Đảm bảo user.email có giá trị trước khi tạo kết nối

      eventSourceRef.current = new EventSource(`http://localhost:8080/sse/subscribe/${user.email}`);

      eventSourceRef.current.addEventListener("notification", function (event) {
          const data: MessageNotifyResponse = JSON.parse(event.data);
          if (currFriend && data.sendFrom === currFriend.email && isOpen) {
              dispatch(DeleteMessageNotify({ content: "", sendAt: "", sendFrom: currFriend.email, sendTo: '' }));
          } else {
              dispatch(PushMessageNotify(data));
          }
      });

      eventSourceRef.current.onerror = function (error) {
          console.error("Lỗi SSE:", error);
      };

      return () => {
          eventSourceRef.current?.close();
          console.log("Đóng kết nối SSE");
      };
  }, [user, currFriend, isOpen, dispatch]);


  

  // const eventSource = new EventSource(`http://localhost:8080/sse/subscribe/${user!.email}`);


  // eventSource.addEventListener("notification", function (event) {
  //     const data:MessageNotifyResponse=JSON.parse(event.data);
  //     if(currFriend&&data.sendFrom==currFriend.email&&isOpen){
  //       dispatch(DeleteMessageNotify({content:"",sendAt:"",sendFrom:currFriend.email,sendTo:''}))
  //     }
  //     else{
  //       dispatch(PushMessageNotify(JSON.parse(event.data)))
  //     }
      
  // });

  // eventSource.onerror = function (error) {
  //     console.error("Lỗi SSE:", error);
  // };

  // Định nghĩa items cho Menu
  const items: MenuItem[] = [
    {
      key: '/',
      label: <Link to="/" style={{ fontSize: '15px' }}>Trang chủ</Link>,
      icon: <HomeOutlined />
    },
    {
      key: '/watch',
      label: <Link to="/watch" style={{ fontSize: '15px' }}>Watch</Link>,
      icon: <VideoCameraOutlined />
    },
    {
      key: '/group',
      label: <Link to="/group" style={{ fontSize: '15px' }}>Nhóm</Link>,
      icon: <TeamOutlined />
    },
    {
      key: '/marketplace',
      label: <Link to="/marketplace" style={{ fontSize: '15px' }}>Marketplace</Link>,
      icon: <ShopOutlined />
    },
  ];
  const menuKey = screens.lg ? "menu-lg" : "menu-sm";
  return (
    <>
      <Row className="Home_header_navbar" align="middle">
        {/* leftleft */}
        <Col xs={12} sm={12} lg={6} style={{height:"100%"}} className="Home_header_navbar-left">
          <Row gutter={[5,5]} style={{padding:10}}>
            <Col xs={0} lg={8}>
              <Link to='/' style={{ fontSize: '10px' }}><span className="logo">FaceBug</span></Link>
            </Col>
            <Col xs={4} lg={0}>
              <Link to='/' style={{ fontSize: '10px' }}><span className="logo">FB</span></Link>
            </Col>
            <Col xs={20} lg={16} className="search-bar">
              <SearchOutlined className="search-icon" />
              <SearchBar></SearchBar>
            </Col>
          </Row>
            
        </Col>
          
        <Col xs={0} sm={0} lg={12} style={{height:"100%"}} className="Home_header_navbar-mid">
            <Menu
              key={menuKey}
              className="menu"
              mode="horizontal"
              items={items as MenuProps["items"]}
              selectedKeys={[location.pathname]}
            />
        </Col>
          
        <Col xs={12} sm={12} lg={6} style={{height:"100%"}} className="Home_header_navbar-right">
            <div className="icon">
              <Conversation/>
            </div>
            <div className="icon">
              <Notify />
            </div>
            <div className="icon">
              <UserOption/>
            </div>
        </Col>
      </Row>
      
      <Outlet></Outlet>
    </>
  );
};

export default TopBar;