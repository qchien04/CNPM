import { Avatar, Button, Card, Col, Divider, Input, Row } from "antd"
import {PictureOutlined, FlagOutlined, VideoCameraOutlined} from "@ant-design/icons"
import './PostNewStatusBar.css'

const PostNewStatusBar=()=>{
    return(
        <>
            <Card style={{ borderRadius: 10, padding: 16,maxHeight:200,boxShadow: "0 2px 8px rgba(0,0,0,0.1)"  }}>
                <Row align="middle" gutter={16}>
                  <Col span={3}>
                    <Avatar
                      src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
                      size={40}
                      style={{marginLeft:10}}
                    />
                  </Col>
                  <Col span={20} offset={1} flex="auto">
                    <Input
                      placeholder="Bạn đang nghĩ gì?"
                      style={{
                        borderRadius: 20,
                        backgroundColor: "#f0f2f5",
                        padding: "8px 16px",
                      }}
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Row justify="space-around">
                  <Col span={8}>
                    <Button className="button_upload_post" style={{width:"100%",height:"100%",border:0}}>
                      <div style={{ textAlign: "center" }}>
                        <VideoCameraOutlined style={{ color: "red", fontSize: 24 }} />
                        <div style={{ fontSize: 12, fontWeight: "bold", color: "#555" }}>
                          Video trực tiếp
                        </div>
                      </div>
                    </Button>
                    
                  </Col>
                  <Col span={8}>
                    <Button className="button_upload_post" style={{width:"100%",height:"100%",border:0}}>
                      <div style={{ textAlign: "center" }}>
                        <PictureOutlined style={{ color: "green", fontSize: 24 }} />
                        <div style={{ fontSize: 12, fontWeight: "bold", color: "#555" }}>
                          Ảnh/video
                        </div>
                      </div>
                    </Button>
                  </Col>
                  <Col span={8}>
                      <Button className="button_upload_post" style={{width:"100%",height:"100%",border:0}}>
                        <div style={{ textAlign: "center" }}>
                          <FlagOutlined style={{ color: "blue", fontSize: 24 }} />
                          <div style={{ fontSize: 12, fontWeight: "bold", color: "#555" }}>
                            Sự kiện trong đời
                          </div>
                        </div>
                      </Button>
                    
                  </Col>
                </Row>
              </Card>
        </>
    )
}

export default PostNewStatusBar;