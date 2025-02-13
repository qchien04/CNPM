import { Table, Tag } from "antd";
import { MonthlyInvoiceListProps, MonthlyInvoiceReSponse } from "../type"; 
import DeleteMonthlyInvoice from "./DeleteMonthlyInvoice";

const MonthlyInvoiceTable: React.FC<MonthlyInvoiceListProps> = ({ monthlyInvoiceList,onReload }) => {
  const columns = [
    {
      title: "phòng",
      key: "motelRoom_name",
      render: (_: unknown, record: MonthlyInvoiceReSponse) => (
        <>
          {record.motelRoom_name}{` (id:${record.motelRoom_id})`}
        </>
      ),
    },
    {
      title: "Tháng thanh toán",
      dataIndex: "payment_month",
      key: "payment_month",
    },
    {
      title: "Người thuê",
      dataIndex: "tenant_name",
      key: "tenant_name",
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
      title: "Số điện",
      key: "electric_number",
      render: (_: unknown, record: MonthlyInvoiceReSponse) => (
        <>
          {record.new_electric_number}-{record.last_water_number}={record.new_electric_number-record.last_water_number}
        </>
      ),
    },
    {
      title: "Số nước",
      key: "water_number",
      render: (_: unknown, record: MonthlyInvoiceReSponse) => (
        <>
          {record.new_water_number}-{record.last_water_number}={record.new_water_number-record.last_water_number}
        </>
      ),
    },
    {
      title: "Tăng/Giảm chi phí",
      dataIndex: "surcharge",
      key: "surcharge",
    },
    {
      title: "Trạng thái",
      dataIndex: "paid",
      key: "paid",
      render: (_: unknown, record: MonthlyInvoiceReSponse) => (
        <>
          {!record.paid ? (
            <>
              <Tag color="magenta">Chưa thanh toán</Tag>
            </>
          ) : (
            <>
              <Tag color="magenta">Đã thanh toán</Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: unknown, record: MonthlyInvoiceReSponse) => (
        <>
          {/* <EditRoomRentalDetail record={record} onReload={onReload}></EditRoomRentalDetail> */}
          <DeleteMonthlyInvoice record={record} onReload={onReload} />
        </>
      ),
    },
  ];

  return (
    <Table dataSource={monthlyInvoiceList} columns={columns} rowKey={"motelRoom_name"} />
  );
};

export default MonthlyInvoiceTable;
