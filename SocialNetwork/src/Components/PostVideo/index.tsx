import { Card, Row, Col, Avatar, Typography, Button } from "antd";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import "./Post.css"
import VideoPlayerHLS from "../VideoPlayerHLS";
const { Title, Text } = Typography;

const PostVideo = () => {
  return (
    <Card
      style={{
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "650px",
        backgroundColor:"white",
        marginBottom:"20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
      }}
      bordered={false}
    >
      {/* Header */}
      <Row align="middle" gutter={[16, 16]}>
        <Col>
          <Avatar size={48} src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg" />
        </Col>
        <Col>
          <Title level={5} style={{ margin: 0 }}>
            Achien
          </Title>
          <Text type="secondary">Cập nhật 19 giờ trước</Text>
        </Col>
      </Row>

      {/* Nội dung bài đăng */}
      <Row style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Text>
            Đây là nội dung bài đăng của nhóm. Bạn có thể thay thế bằng nội dung thực tế mà a a s  không cần
            sử dụng hình ảnh bên trong code.
          </Text>
        </Col>
      </Row>
      <Row style={{ width: "100%", marginTop: "16px" }}>
        <Col span={24} >
          <VideoPlayerHLS></VideoPlayerHLS>

        </Col>
      </Row>

      {/* Phần Thích và Bình luận */}
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginTop: "16px",
          borderTop: "1px solid rgb(164, 158, 158)",
          paddingTop: "8px",
        }}
      >
        <Col span={8} offset={3}>
          <Button type="text" icon={<LikeOutlined />}>
            Thích
          </Button>
        </Col>
        <Col span={8}>
          <Button type="text" icon={<CommentOutlined />}>
            Bình luận
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default PostVideo;
