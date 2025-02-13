import { useEffect, useState } from "react";
import MotelRoomGrid from "../MotelRoomGrid";
import { MotelRoom } from "../../RoomManager/type";
import { MotelRoomService } from "../../../services/roomManagerService";
import { useSearchParams } from "react-router-dom";

const SearchPage:React.FC=()=>{
    
  const [rooms, setRooms] = useState<MotelRoom[]>([]);
  const [searchParams]=useSearchParams();
  const key = searchParams.get("key")|| "";
  // Hàm fetch dữ liệu
  const fetchApi = async () => {
    const response = await MotelRoomService.getAllMotelRoomWithKey(key);
    setRooms(response.reverse()); // Cập nhật state với danh sách phòng
    console.log(response)
  };

  useEffect(() => {
    fetchApi();
  }, [searchParams]);


  return (
    <>
      <MotelRoomGrid rooms={rooms} />
    </>
  );
}


export default SearchPage;