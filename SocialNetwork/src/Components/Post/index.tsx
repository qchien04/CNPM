import { Card, Row, Col, Avatar, Typography, Button, Image } from "antd";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import "./Post.css"
const { Title, Text } = Typography;

const Post = () => {
  return (
    <Card
      style={{
        borderRadius: "8px",
        padding: "16px",
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
        <Col span={24}>
          <Image
            className="full-width-image"
            src="https://www.shutterstock.com/image-photo/this-piture-path-park-autumn-260nw-1232109808.jpg"
            style={{
              width: "100%",
              height: "auto", // Giữ tỉ lệ gốc của ảnh
              maxHeight: "500px", // Giới hạn chiều cao tối đa nếu ảnh quá lớn
              objectFit: "contain",
            }}
            preview={true}
          />
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

export default Post;
