import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { RoomentalDetailOperation } from "../type";
import { RoomRentalDetailService } from "../../../services/roomManagerService";



const DeleteRoomRentalDetail: React.FC<RoomentalDetailOperation> = (props) => {
  const { record, onReload } = props;

  const handleDelete = async () => {
    try {
      const response = await RoomRentalDetailService.deleteRoomRentalDetail(record.id?record.id:0);
      if (response.status) {
        onReload();
        alert("Xóa thành công");
      } else {
        alert("Có lỗi xảy ra khi xóa");
      }
    } catch (error) {
      console.error("Lỗi khi xóa hợp đồng:", error);
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

export default DeleteRoomRentalDetail;
