import { useEffect, useState } from "react";
import { Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import RoomRentalDetailTable from "./RoomRentalDetailTable";
import { RoomRentalDetailResponse } from "../type"; 
import { RoomRentalDetailService } from "../../../services/roomManagerService";

function ListRoomRentalDetail() {
  // Kiểu dữ liệu của `rooms` là một mảng các đối tượng `Room`
  const [roomRentalDetails, setRoomRentalDetail] = useState<RoomRentalDetailResponse[]>([]);

  // Hàm fetch dữ liệu
  const fetchApi = async () => {
    const response = await RoomRentalDetailService.getMyRoomRentalDetail();
    setRoomRentalDetail(response.reverse()); // Cập nhật state với danh sách phòng
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
      <Button>
        <AppstoreOutlined />
      </Button>

      <RoomRentalDetailTable roomRentalDetailList={roomRentalDetails} onReload={handleReload}></RoomRentalDetailTable>
    </>
  );
}

export default ListRoomRentalDetail;
