import { Badge, Table, Tag } from "antd";
import { MotelRoom, RoomListProps } from "../type"; // Giả sử bạn đã định nghĩa kiểu dữ liệu Room
import DeleteMotelRoom from "./DeleteMotelRoom";
import EditMotelRoom from "./EditMotelRoom";


const MotelRoomTable: React.FC<RoomListProps> = ({ rooms,onReload }) => {
  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số giường",
      dataIndex: "bed_quantity",
      key: "bed_quantity",
    },
    {
      title: "Số người",
      dataIndex: "max_guests",
      key: "max_guests",
    },
    {
      title: "Loại phòng",
      dataIndex: "type_room",
      key: "type_room",
      render: (_: unknown, record: MotelRoom) => (
        <>
          {record.area>76 ? (
            <Badge color="purple" text="VIP" />
          ) : (
            <Badge color="gray" text="Thường" />
          )}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: unknown, record: MotelRoom) => (
        <>
          {record.inhabited ? (
            <>
              <Tag color="magenta">Mới cập nhật</Tag>
              <Badge color="red" text="Hết phòng" />
            </>
          ) : (
            <>
              <Tag color="magenta">Mới cập nhật</Tag>
              <Badge color="green" text="Còn phòng" />
            </>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: unknown, record: MotelRoom) => (
        <>
          <EditMotelRoom record={record} onReload={onReload} />
          <DeleteMotelRoom record={record} onReload={onReload} />
        </>
      ),
    },
  ];

  return (
    <Table dataSource={rooms} columns={columns} rowKey={"id"} />
  );
};

export default MotelRoomTable;
