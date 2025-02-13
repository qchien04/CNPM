import { Col, Layout, Row,Grid  } from "antd";
import "./HomeLayout.css"; // Import CSS file
import LeftSider from "./LeftSider";
import RightSider from "./RightSider";
import { Outlet } from "react-router-dom";
const { useBreakpoint } = Grid;
const {Content } = Layout;

export default function HomeLayout() {
  const screens = useBreakpoint();
  const smallScreen=screens.xs;
  const fixedWidth = '25%';


  return (
      // <Layout>
      //   <Row style={{width:"100%",padding:0,margin:0}}>
          
      //     <Col xs={0} sm={0} lg={6}>
      //      <LeftSider/>
      //     </Col>

      //     <Col xs={24} sm={24}  lg={12} style={{backgroundColor:"white",maxWidth:"100%"}}>
      //       <Content className="home-content">
      //        <Outlet></Outlet>
      //       </Content>
      //     </Col>

      //     <Col xs={0} sm={0} md={6} lg={6} xl={6} xxl={6} >
      //       <RightSider/>
      //     </Col>
      //   </Row>
      // </Layout>

      <div style={{ position: 'relative',width:"100%" }}>
      {!smallScreen && (
        <Col
          xs={0}
          sm={6}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: fixedWidth,
            backgroundColor: '#f0f2f5',
            padding: 16,
            boxSizing: 'border-box',
            overflow:"hidden",
            zIndex: 1,
          }}
        >
          <LeftSider/>
        </Col>
      )}

      <Row
        style={{
          marginLeft: !smallScreen?fixedWidth:0,
          marginRight: !smallScreen?fixedWidth:0,
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <Col xs={24} md={24} lg={24 } xl={24  } xxl={24}>
          <Content className="home-content">
            <Outlet></Outlet>
          </Content>
        </Col>
      </Row>

      {!smallScreen && (
        <Col
          xs={0}
          sm={6}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: fixedWidth,
            backgroundColor: '#f0f2f5',
            padding: 16,
            boxSizing: 'border-box',
            zIndex: 1,
            overflow:"hidden",
          }}
        >
          <RightSider/>
        </Col>
      )}
    </div>


  );
}
