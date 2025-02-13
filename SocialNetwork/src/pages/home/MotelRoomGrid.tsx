import { Badge, Card, Col, Row } from "antd";
import { MotelRoom } from "../RoomManager/type";
import { useNavigate } from "react-router-dom";

interface RoomGridProps {
  rooms: MotelRoom[]; 
}

const MotelRoomGrid: React.FC<RoomGridProps> = ({ rooms }) => {
  const navigate=useNavigate();
  return (
    <>
      <Row gutter={[20/*khoang cach giua 2 cot*/, 20/*khoang cach giua 2 hang*/]} justify={"center"}>
        {rooms.map((item) => (
          <Col span={10} key={item.id}>
            <Badge.Ribbon
              text={!item.inhabited ? "Còn phòng" : "Hết phòng"}
              color={!item.inhabited ? "green" : "gray"}
            >
              
              <Card title={item.name} onClick={()=>navigate(`/motelRoom/${item.id}`)} style={{cursor:"pointer"}}>
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
