import { Layout } from "antd";
import "./GroupLayout.css"; // Import CSS file
import LeftSider from "./LeftSider";
import { Outlet } from "react-router-dom";

const {Content } = Layout;

export default function GroupLayout() {
  return (
    <Layout className="h-screen">
      {/* Navbar */}
      <Layout>
        {/* Sidebar Left */}
        <LeftSider/>/

        {/* Main Content */}
        <Content className="Group-content">
          <div className="post">Nhom
          </div>
          <Outlet></Outlet>
        </Content>

      </Layout>
    </Layout>
  );
}
