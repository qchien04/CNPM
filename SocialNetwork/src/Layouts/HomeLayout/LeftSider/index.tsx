import { HomeOutlined, TeamOutlined, ShopOutlined, VideoCameraOutlined, UserOutlined} from "@ant-design/icons"

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
        key: '0',
        label: <Link to='/profile/1' >Achien</Link>,
        icon: <UserOutlined />
      },
      {
        key: '1',
        label: <Link to='/' >Trang chủ</Link>,
        icon: <HomeOutlined />
      },
      {
        key: '2',
        label: <Link to='/watch' >Watch</Link>,
        icon: <VideoCameraOutlined />
      },
      {
        key: '3',
        label: <Link to='/group'>Nhóm</Link>,
        icon: <TeamOutlined />
      },
      {
        key: '4',
        label: <Link to='/marketplace'>Marketplace</Link>,
        icon: <ShopOutlined />
      },
  
    ];

    return(
        <Sider className="Home_sidebar-left">
          <Menu
            className="menu"
            mode="inline"
            items={items as MenuProps['items']} 
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={['1']}
          />
          
        </Sider>
    )
}

export default LeftSider;