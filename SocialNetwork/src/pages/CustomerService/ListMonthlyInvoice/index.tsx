import { useEffect, useState } from "react";
import { Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { MonthlyInvoiceReSponse } from "../type"; 
import { MonthlyInvoiceService } from "../../../services/roomManagerService";
import MonthlyInvoiceTable from "./MonthlyInvoiceTable";

function ListMonthlyInvoiceForTenant() {
  const [monthlyInvoice, setMonthlyInvoice] = useState<MonthlyInvoiceReSponse[]>([]);

  // Hàm fetch dữ liệu
  const fetchApi = async () => {
    const response = await MonthlyInvoiceService.getTenantMonthlyInvoice();
    console.log(response)
    setMonthlyInvoice(response.reverse());
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

      <MonthlyInvoiceTable monthlyInvoiceList={monthlyInvoice} onReload={handleReload}></MonthlyInvoiceTable>
    </>
  );
}

export default ListMonthlyInvoiceForTenant;
