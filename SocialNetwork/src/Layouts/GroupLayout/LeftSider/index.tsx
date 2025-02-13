import { HomeOutlined, TeamOutlined, ShopOutlined, VideoCameraOutlined} from "@ant-design/icons"

import "./LeftSider.css";
import Sider from "antd/es/layout/Sider";
import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
interface MenuItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}
const LeftSider:React.FC=()=>{
  const items: MenuItem[] = [
      {
        key: '1',
        label: <Link to='/' style={{ fontSize: '10px' }}>Trang chủ</Link>,
        icon: <HomeOutlined />
      },
      {
        key: '2',
        label: <Link to='/watch' style={{ fontSize: '10px' }}>Watch</Link>,
        icon: <VideoCameraOutlined />
      },
      {
        key: '3',
        label: <Link to='/group' style={{ fontSize: '10px' }}>Nhóm</Link>,
        icon: <TeamOutlined />
      },
      {
        key: '4',
        label: <Link to='/marketplace' style={{ fontSize: '10px' }}>Marketplace</Link>,
        icon: <ShopOutlined />
      },
  
    ];

    return(
        <Sider width={350} className="Group_sidebar">
          <Menu
            className="menu"
            mode="inline"
            items={items as MenuProps['items']} // Explicit type assertion for items
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={['1']}
          />
        </Sider>
        
    )
}

export default LeftSider;