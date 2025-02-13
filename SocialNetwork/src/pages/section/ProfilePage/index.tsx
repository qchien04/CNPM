import "./ProfilePage.css";
import {ReadOutlined,EnvironmentOutlined,ClockCircleOutlined, FilterOutlined, SettingOutlined, AppstoreOutlined, BarsOutlined} from "@ant-design/icons"
import { Button, Layout, Avatar, Image, Tabs, Row, Col,Grid, Card } from "antd";
import { useState } from "react";
import Post from "../../../Components/Post";
import PostNewStatusBar from "../../../Components/PostNewStatusBar";



const { Content } = Layout;

const testContent1={
  school:"THPT binh xuyen",
  address:"Vinh Phuc",
  joinAt:"12 thang 12 nam 2010",
}
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const [viewMode, setViewMode] = useState("list");
  const smallScreen=screens.xs;

  return (
    <>
   
    <Layout className="profile-container">
      {/* toptop */}
      <Row style={{width:"100%",maxWidth:1600,height:smallScreen?200:550,overflow:"hidden",backgroundColor:"white",}}>
        <Col span={24} style={{backgroundColor:"#F2F4F7",height:"100%", borderBottom: "1px solid rgba(128, 128, 128, 0.5)",boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Row>
            <Col span={16} offset={4} style={{backgroundColor:"white",height:330}}>
              <div className="cover_photo">
                <Image
                  src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                  style={{ width:"100%",height:370, objectFit: 'cover' }}
                  preview={false}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4} style={{}}>
              <div className="avatar_profile">
                <Avatar
                  size={100}
                  src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg" 
                />
              </div>
              
              <div className="operation_profile">
                <Button>Chinh sua</Button>
              </div>

              
            </Col>
          </Row>
          <Row >
            <Col span={16} offset={4} style={{backgroundColor:"#F2F4F7",position:"absolute",paddingLeft:10,bottom:0,width:"100%"}}>
              <div className="option_profile">
                  <Tabs
                    defaultActiveKey="1"
                    items={[
                      { label: <strong>Bài viết</strong>, key: "1" },
                      { label: <strong>Giới thiệu</strong>, key: "2" },
                      { label: <strong>Bạn bè</strong>, key: "3" },
                      { label: <strong>Ảnh</strong>, key: "4" }, 
                      { label: <strong>Video</strong>, key: "5" }, 
                      { label: <strong>Xem thêm</strong>, key: "7" }, 
                    ]}
                    style={{
                      borderTop:"2px solid black",
                      marginBottom:"0",
                      paddingBottom:"0",
                      padding: "20px",
                      width:"100%",
                      boxShadow:"none",

                    }}
                    tabBarStyle={{ background:"#F2F4F7" ,color: "#F2F4F7", borderBottom: "none" }}
                  />
                </div>
            </Col>
          </Row>
        </Col>

      
      </Row>

      {/* Bottom */}
      <Row style={{width:"100%",maxWidth:1600,backgroundColor:"white"}}>
        <Col span={16} offset={4} style={{backgroundColor:"white"}}>
          <Row>
            {/*Left*/}
            <Col span={smallScreen?0:9} style={{backgroundColor:"white",marginLeft:20}}>
              <Content className="left-profile">
                <Card className="section_profile-bottom-left intro">
                  <Row gutter={[0,10]} justify={"center"} align={"middle"}> 
                  <Col span={24} style={{fontSize:20}}>
                      Giới thiệu
                    </Col>
                    <Col span={24} style={{ textAlign: "center" }}>
                      <Button style={{ width: "90%", backgroundColor: "rgb(198, 215, 230)" }}>Thêm tiểu sử</Button>
                    </Col>
                    <Col span={24}  className="mt-1">
                      <ReadOutlined style={{fontSize:20}}/> Đang học tại <p style={{fontWeight:700,display:"inline"}}>{testContent1.school}</p>
                    </Col>
                    <Col span={24}  className="mt-1">
                      <EnvironmentOutlined style={{fontSize:20}}/> Đang sống ở <p style={{fontWeight:700,display:"inline"}}>{testContent1.address}</p>
                    </Col>
                    <Col span={24} className="mt-1">
                      <ClockCircleOutlined style={{fontSize:20}}/> Tham gia vào <p style={{fontWeight:700,display:"inline"}}>{testContent1.joinAt}</p>
                    </Col>  
                    <Col span={24} className="mt-3 mb-1" style={{ textAlign: "center" }}>
                      <Button style={{width:'90%',backgroundColor:"rgb(198, 215, 230)"}}>Chinh sua</Button>
                    </Col>
                  </Row>
                </Card>

                <Card className="section_profile-bottom-left picture">
                  <div className="d-flex justify-content-between">
                    <div style={{fontSize:23,fontWeight:500,marginLeft:10}}>Ảnh </div>
                    <div style={{fontSize:23,fontWeight:500}}>
                      <Button type="link" style={{fontSize:20}}>Xem thêm</Button>
                    </div>
                  </div>
                  <div className="picturelist">
                    <Row >
                      <Col span={8} >
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="picture_element"
                          preview={true}
                        />
                      </Col>
                      <Col span={8} >
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="picture_element"
                          preview={true}
                        />
                      </Col>
                      <Col span={8} >
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="picture_element"
                          preview={true}
                        />
                      </Col>
                      <Col span={8} >
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="picture_element"
                          preview={true}
                        />
                      </Col>
                      <Col span={8} >
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="picture_element"
                          preview={true}
                        />
                      </Col>
                      <Col span={8} >
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="picture_element"
                          preview={true}
                        />
                      </Col>
                      
                    </Row>
                  </div>
                </Card>  

                <Card className="section_profile-bottom-left friend">
                  <div className="d-flex justify-content-between">
                    <div style={{fontSize:20,fontWeight:500,marginLeft:10}}>Bạn bè </div>
                    <div style={{fontSize:20,fontWeight:500}}>
                      <Button type="link" style={{fontSize:15}}>Xem tất cả bạn bè</Button>
                    </div>
                  </div>
                  
                  <div className="picturelist">
                    <Row>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <Col span={8} style={{marginBottom:20}} key={i}>
                        <Image src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                          style={{objectFit: 'cover'}}
                          className="avt_element"
                          preview={true}
                        />
                        <Button type="link" style={{marginLeft:0,paddingLeft:5,paddingTop:5,marginTop:0}}>A chiến</Button>
                    </Col>
                    ))}
                    </Row>
                    
                  </div>
                </Card>  


              </Content>
            </Col>
            

            {/* Right */}
            <Col span={smallScreen?24:14} style={{backgroundColor:"white",marginTop:19,borderRadius:10,marginRight:0}}>
              
              {/* Dang bai */}
              <Row>
                <Col span={24}><PostNewStatusBar/></Col>
              </Row>

              {/* Bo loc */}
              <Row>
                <Col span={24}>
                  <Card  className="filter" style={{backgroundColor:"#fff", marginTop: "16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
                      <Col>
                        <h3 style={{ margin: 0, fontWeight: "bold" }}>Bài viết</h3>
                      </Col>
                      <Col>
                        <Button className="button_manager_post" icon={<FilterOutlined />} style={{ marginRight: "8px",background:"rgb(201, 191, 191)"}}>
                          Bộ lọc
                        </Button>
                        <Button className="button_manager_post" icon={<SettingOutlined />} style={{background:"rgb(201, 191, 191)"}}>Quản lý bài viết</Button>
                      </Col>
                    </Row>
                    <Row justify="start" gutter={[16, 0]} style={{ borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>
                      <Col>
                        <Button
                          type={viewMode === "list" ? "primary" : "text"}
                          icon={<BarsOutlined />}
                          onClick={() => setViewMode("list")}
                          style={{ padding: "0 16px" }}
                        >
                          Chế độ xem danh sách
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          type={viewMode === "grid" ? "primary" : "text"}
                          icon={<AppstoreOutlined />}
                          onClick={() => setViewMode("grid")}
                          style={{ padding: "0 16px"}}
                        >
                          Chế độ xem lưới
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              
              {/* bai viet */}
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>

              
            </Col>
          </Row>


        </Col>

      
      </Row>


    </Layout>
    </>



    
  );
};

export default ProfilePage;
