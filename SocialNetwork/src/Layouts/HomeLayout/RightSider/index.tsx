// import {HomeOutlined, ShopOutlined, TeamOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons"

import {UserOutlined} from "@ant-design/icons"
import "./RightSider.css";
import Sider from "antd/es/layout/Sider";
// import { Link } from "react-router-dom";
// import { Menu, MenuProps } from "antd";
// interface MenuItem {
//   key: string;
//   label: React.ReactNode;
//   disabled?: boolean;
//   icon?: React.ReactNode;
// }
const RightSider:React.FC=()=>{
  // const items: MenuItem[] = [
  //   {
  //     key: '0',
  //     label: <Link to='/profile/1' style={{ fontSize: '20px' }}>Achien</Link>,
  //     icon: <UserOutlined />
  //   },
  //   {
  //     key: '1',
  //     label: <Link to='/' style={{ fontSize: '20px' }}>Trang chủ</Link>,
  //     icon: <HomeOutlined />
  //   },
  //   {
  //     key: '2',
  //     label: <Link to='/watch' style={{ fontSize: '20px' }}>Watch</Link>,
  //     icon: <VideoCameraOutlined />
  //   },
  //   {
  //     key: '3',
  //     label: <Link to='/group' style={{ fontSize: '20px' }}>Nhóm</Link>,
  //     icon: <TeamOutlined />
  //   },
  //   {
  //     key: '4',
  //     label: <Link to='/marketplace' style={{ fontSize: '20px'}}>Marketplace</Link>,
  //     icon: <ShopOutlined />
  //   },

  // ];

    return(
        <Sider className="Home_sidebar-right">
          <h3 className="sidebar-title">Bạn bè đang online</h3>
          <div className="friend">
            <UserOutlined className="friend-icon" /> <span>Người dùng 1</span>
          </div>
          <div className="friend">
            <UserOutlined className="friend-icon" /> <span>Người dùng 2</span>
          </div>
          {/* <Menu
            className="menu"
            mode="inline"
            items={items as MenuProps['items']} 
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={['1']}
          /> */}
          
        </Sider>
        
    )
}

export default RightSider;