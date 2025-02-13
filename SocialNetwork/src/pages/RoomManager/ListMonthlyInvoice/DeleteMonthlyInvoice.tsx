import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { MonthlyInvoiceOperation } from "../type";
import { MonthlyInvoiceService } from "../../../services/roomManagerService";



const DeleteMonthlyInvoice: React.FC<MonthlyInvoiceOperation> = (props) => {
  const { record, onReload } = props;

  const handleDelete = async () => {
    try {
      const response = await MonthlyInvoiceService.deletemonthlyInvoice(record.id?record.id:0);
      if (response.status) {
        onReload();
        alert("Xóa thành công");
      } else {
        alert("Có lỗi xảy ra khi xóa");
      }
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
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

export default DeleteMonthlyInvoice;
