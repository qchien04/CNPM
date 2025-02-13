import { Badge, Card, Col, Row } from "antd";
import { MotelRoom } from "../type"; // Giả sử bạn đã định nghĩa kiểu dữ liệu Room

interface RoomGridProps {
  rooms: MotelRoom[]; // `rooms` là một mảng các đối tượng kiểu Room
}

const MotelRoomGrid: React.FC<RoomGridProps> = ({ rooms }) => {
  return (
    <>
      <Row gutter={[20, 20]}>
        {rooms.map((item) => (
          <Col span={12} key={item.id}>
            <Badge.Ribbon
              text={!item.inhabited ? "Còn phòng" : "Hết phòng"}
              color={!item.inhabited ? "green" : "gray"}
            >
              
              <Card title={item.name}>
                <p>
                  Số giường: <strong>{item.bed_quantity}</strong>
                </p>
                <p>
                  Số người: <strong>{item.max_guests}</strong>
                </p>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MotelRoomGrid;
