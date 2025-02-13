import { Layout } from "antd";
import "./MarketPlaceLayout.css"; // Import CSS file
import LeftSider from "./LeftSider";
import { Outlet } from "react-router-dom";

const {Content } = Layout;

export default function MarketPlaceLayout() {
  return (
    <Layout className="h-screen">
      {/* Navbar */}
      <Layout>
        {/* Sidebar Left */}
        <LeftSider/>/

        {/* Main Content */}
        <Content className="MarketPlace-content">
          <div className="post">Trang market
          </div>
          <Outlet></Outlet>
        </Content>

      </Layout>
    </Layout>
  );
}
