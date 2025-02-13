import { Button, Form, Input, InputNumber, message, Select} from "antd";
import { Outlet } from "react-router-dom";
import { CreatMonthlyInvoiceRequest, RoomRentalDetailResponse } from "../type";
import { useEffect, useState } from "react";
import { APIResponse, MonthlyInvoiceService, RoomRentalDetailService } from "../../../services/roomManagerService";
import moment from "moment";



const { Option } = Select;


interface FormInput{
  person_quantity: number;
  new_electric_number: number;
  last_electric_number: number;
  new_water_number: number;
  last_water_number: number;
  payment_month: string ;
  surcharge: number;
  note: string ;
  roomRentalDetail_id: number;
}


function CreateMonthlyInvoice() {
  const [form] = Form.useForm<FormInput>();
  const [messageApi, contextHolder] = message.useMessage();
  const [roomRentaiDetailsList,setRoomRentaiDetailsList] =useState<RoomRentalDetailResponse[]>([]);

  const fetchRoomRentaiDetailsList=async()=>{
    const res=await RoomRentalDetailService.getMyRoomRentalDetail();
    const a=res.filter((val)=>val.expire==false);
    setRoomRentaiDetailsList(a);
  }

  const handleChangeRoomRentalDetail=(e:number)=>{
    const a=roomRentaiDetailsList.filter((val)=>val.id==e);
    form.setFieldsValue({
      person_quantity: a[0].person_quantity,
    });
  }


  useEffect(()=>{
    fetchRoomRentaiDetailsList();
  },[]);

  const handleSubmit = async (values: FormInput) => {
    const {person_quantity,last_electric_number,new_electric_number,last_water_number,new_water_number,
            payment_month,surcharge,note,roomRentalDetail_id}=values;
    const req:CreatMonthlyInvoiceRequest={
      person_quantity,
      last_electric_number,
      new_electric_number,
      last_water_number,
      new_water_number,
      payment_month,
      surcharge,
      paid:false,
      note,
      roomRentalDetail_id,
      create_time:moment().format("YYYY-MM-DDTHH:mm:ss"),
    }
    console.log(req);
    const response:APIResponse = await MonthlyInvoiceService.createMonthlyInvoice(req);
    if (response.status) {
      messageApi.open({
        type: "success",
        content: "Tạo hợp đồng thành công",
        duration: 5,
      });
      form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Tạo hợp đồng không thành công",
        duration: 5,
      });
      //form.resetFields();
    }
  };

  const rules1 = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  return (
    <>
      {contextHolder}
      <h2>Create room</h2>
      <Form<FormInput>
        form={form}
        name="create-room"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          person_quantity: 0,
          last_electric_number: 0,
          new_electric_number: 0,
          last_water_number: 0,
          new_water_number: 0,
          surcharge: 0,
          payment_month: "",
          note: "",
        }}
      >
        <Form.Item label="Hóa đơn cho phòng" name="roomRentalDetail_id" rules={rules1}>
          <Select
            style={{ width: "100%" }}
            allowClear
            onChange={handleChangeRoomRentalDetail}
          >
            {roomRentaiDetailsList?.map((roomRentaiDetail,index)=>(
              <Option value={roomRentaiDetail.id} key={index}>{roomRentaiDetail.motelRoom_name}:{roomRentaiDetail.note}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Số người ở" name="person_quantity" rules={rules1}>
          <InputNumber/>
        </Form.Item>

        <Form.Item label="Số điện cũ" name="last_electric_number" rules={rules1}>
          <InputNumber/>
        </Form.Item>

        <Form.Item label="Số điện mới" name="new_electric_number" rules={rules1}>
          <InputNumber/>
        </Form.Item>

        <Form.Item label="Số nước cũ" name="last_water_number" rules={rules1}>
          <InputNumber/>
        </Form.Item>

        <Form.Item label="Số nước mới" name="new_water_number" rules={rules1}>
          <InputNumber/>
        </Form.Item>

        <Form.Item label="Chi phí khác/Giảm tiền" name="surcharge" rules={rules1}>
          <InputNumber/>
        </Form.Item>

        <Form.Item label="Tháng thanh toán" name="payment_month" rules={rules1}>
          <Input/>
        </Form.Item>

        <Form.Item label="Ghi chú" name="note" rules={rules1}>
          <Input.TextArea showCount maxLength={1000}></Input.TextArea>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo phòng
          </Button>
        </Form.Item>
      </Form>

      <Outlet />
    </>
  );
}

export default CreateMonthlyInvoice;
