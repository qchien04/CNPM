import { Badge, Table, Tag } from "antd";
import { RoomentalDetailListProps, RoomRentalDetailResponse } from "../type"; 
import  DeleteRoomRentalDetail from "./DeleteRoomRentalDetail";
import dayjs from "dayjs";

const RoomRentalDetailTable: React.FC<RoomentalDetailListProps> = ({ roomRentalDetailList,onReload }) => {
  const columns = [
    {
      title: "Mã hợp đồng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Phòng",
      dataIndex: "motelRoom_name",
      key: "motelRoom_name",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Số người",
      dataIndex: "person_quantity",
      key: "person_quantity",
    },
    {
      title: "Ngày bắt đầu thuê",
      dataIndex: "rental_start_time",
      key: "rental_start_time",
      render: (_: unknown, record: RoomRentalDetailResponse) => (
        <>
          {record.rental_start_time ? (
            <>
              {dayjs(record.rental_start_time).format("DD-MM-YYYY HH:mm:ss")}
            </>
          ) : (
            <>
            </>
          )}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "expire",
      key: "expire",
      render: (_: unknown, record: RoomRentalDetailResponse) => (
        <>
          {record.expire ? (
            <>
              <Tag color="magenta">Mới cập nhật</Tag>
              <Badge color="var(--color-text)" text="Hết hiệu lực" />
            </>
          ) : (
            <>
              <Tag color="magenta">Mới cập nhật</Tag>
              <Badge color="green" text="Còn hiệu lực" />
            </>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: unknown, record: RoomRentalDetailResponse) => (
        <>
          <DeleteRoomRentalDetail record={record} onReload={onReload} />
        </>
      ),
    },
  ];

  return (
    <Table dataSource={roomRentalDetailList} columns={columns} rowKey={"id"} />
  );
};

export default RoomRentalDetailTable;
