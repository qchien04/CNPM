import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { MotelRoomOperation } from "../type";
import { MotelRoomService } from "../../../services/roomManagerService";



const DeleteMotelRoom: React.FC<MotelRoomOperation> = (props) => {
  const { record, onReload } = props;

  const handleDelete = async () => {
    try {
      const response = await MotelRoomService.deleteMotelRoomById(record.id?record.id:0);
      if (response) {
        onReload();
        alert("Xóa thành công");
      } else {
        alert("Có lỗi xảy ra khi xóa");
      }
    } catch (error) {
      console.error("Lỗi khi xóa phòng:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <Popconfirm
      title="Bạn có chắc chắn muốn xóa không?"
      onConfirm={handleDelete}
    >
      <Button danger size="small" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};

export default DeleteMotelRoom;
