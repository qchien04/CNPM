import { useEffect, useState } from "react";
import { MotelRoom } from "../RoomManager/type";
import { MotelRoomService } from "../../services/roomManagerService";
import MotelRoomGrid from "./MotelRoomGrid";
import { useSearchParams } from "react-router-dom";

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<MotelRoom[]>([]);
  const [totalPages, setTotalPages] = useState(11); // Giả sử có 16 trang
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // Hàm fetch dữ liệu
  const fetchApi = async () => {
    try {
      const response = await MotelRoomService.getPageMotelRoom(page);
      setRooms(response.data.reverse()); // Cập nhật danh sách phòng
      if(response.totalPages)
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phòng:", error);
    }
  };

  useEffect(() => {
    fetchApi();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Tạo danh sách số trang hiển thị (1 2 3 ... 15 16)
  const generatePageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5; // Số lượng trang hiển thị chính

    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang ít, hiển thị hết
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (page <= 2) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (page >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", page - 1, page, page + 1, "...", totalPages];
      }
    }

    return pages;
  };

  return (
    <>
      <MotelRoomGrid rooms={rooms} />

      {/* Nút chuyển trang */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <button
          onClick={() => setSearchParams({ page: (page - 1).toString() })}
          disabled={page <= 1}
          style={{cursor:(page>1)?"pointer":"",height:25,border:1,borderRadius:10,backgroundColor:(page <=1)?"gray":"#007bff"}}
        >
          {"<<"} Trước
        </button>

        {generatePageNumbers().map((p, index) =>
          p === "..." ? (
            <span key={index} style={{ margin: "0 5px" }}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => setSearchParams({ page: p.toString() })}
              style={{
                margin: "0 5px",
                fontWeight: p === page ? "bold" : "normal",
                backgroundColor: p === page ? "#007bff" : "white",
                color: p === page ? "white" : "black",
                padding: "5px 10px",
                border: "1px solid #007bff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => setSearchParams({ page: (page + 1).toString() })}
          disabled={page >= totalPages}
          style={{cursor:(page < totalPages)?"pointer":"",height:25,border:1,borderRadius:10,backgroundColor:(page >= totalPages)?"gray":"#007bff"}}
        >
          Sau {">>"}
        </button> 
      </div>
    </>
  );
};

export default Home;
