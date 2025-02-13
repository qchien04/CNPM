import { Layout } from "antd";
import "./WatchLayout.css"; // Import CSS file
import LeftSider from "./LeftSider";
import { Outlet } from "react-router-dom";

const {Content } = Layout;

export default function WatchLayout() {
  return (
    <Layout className="h-screen">
      {/* Navbar */}
      <Layout>
        {/* Sidebar Left */}
        <LeftSider/>/

        {/* Main Content */}
        <Content className="Watch-content">

          <Outlet></Outlet>
        </Content>

      </Layout>
    </Layout>
  );
}
