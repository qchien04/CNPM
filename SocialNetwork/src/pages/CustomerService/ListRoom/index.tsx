import { useEffect, useState } from "react";
import { Button } from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import RoomGrid from "./MotelRoomGrid";
import RoomTable from "./MotelRoomTable";
import { MotelRoomService } from "../../../services/roomManagerService";
import { MotelRoom } from "../../RoomManager/type";

function ListMotelRoomForTenant() {
  // Kiểu dữ liệu của `rooms` là một mảng các đối tượng `Room`
  const [rooms, setRooms] = useState<MotelRoom[]>([]);
  const [isGrid, setIsGrid] = useState<boolean>(true);

  // Hàm fetch dữ liệu
  const fetchApi = async () => {
    const response = await MotelRoomService.getTenantMotelRoom();
    setRooms(response.reverse()); // Cập nhật state với danh sách phòng
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Hàm reload danh sách phòng
  const handleReload = () => {
    fetchApi();
  };

  return (
    <>
      {/* Nút chuyển đổi chế độ hiển thị */}
      <Button onClick={() => setIsGrid(false)}>
        <UnorderedListOutlined />
      </Button>
      <Button onClick={() => setIsGrid(true)}>
        <AppstoreOutlined />
      </Button>

      {/* Hiển thị RoomGrid hoặc RoomTable dựa vào `isGrid` */}
      {isGrid ? (
        <RoomGrid rooms={rooms} />
      ) : (
        <RoomTable rooms={rooms} onReload={handleReload} />
      )}
    </>
  );
}

export default ListMotelRoomForTenant;
