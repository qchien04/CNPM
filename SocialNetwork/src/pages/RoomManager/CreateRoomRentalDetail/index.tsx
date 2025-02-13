import { Button, Form, Input, InputNumber, message, Select, DatePicker} from "antd";
import { Outlet } from "react-router-dom";
import { CreateRoomRentalDetailRequest, MotelRoom } from "../type";
import { useEffect, useState } from "react";
import { APIResponse, MotelRoomService, RoomRentalDetailService } from "../../../services/roomManagerService";
import moment from "moment";
import { Dayjs } from "dayjs";



const { Option } = Select;


interface FormInput{
  person_quantity:number,
  rental_start_time:Dayjs,
  tenant_email:string,
  motelRoomId:number,
  note:string,
}



function CreateRoomRentalDetail() {
  const [form] = Form.useForm<FormInput>();
  const [messageApi, contextHolder] = message.useMessage();
  const [motelRoomList,setMotelRoomList] =useState<MotelRoom[]>([]);

  const fetchMotelRoom=async()=>{
    const res:MotelRoom[]=await MotelRoomService.getMyMotelRoom();
    setMotelRoomList(res);
  }

  useEffect(()=>{
    fetchMotelRoom();
  },[]);

  const handleSubmit = async (values: FormInput) => {
    const {person_quantity,tenant_email,motelRoomId,note}=values;
    const rental_start_time =values.rental_start_time.format("YYYY-MM-DDTHH:mm:ss");
    const req:CreateRoomRentalDetailRequest={
      person_quantity,
      tenant_email,
      motelRoomId,
      rental_start_time,
      note,
      expire:false,
      create_time:moment().format("YYYY-MM-DDTHH:mm:ss"),
    }
    console.log(req);
    const response:APIResponse = await RoomRentalDetailService.createRoomRentalDetail(req);
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
      form.resetFields();
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
      >
        <Form.Item label="Tên phòng" name="motelRoomId" rules={rules1}>
          <Select
            style={{ width: "100%" }}
            allowClear
          >
            {motelRoomList?.map((motelRoom,index)=>(
              <Option disabled={motelRoom.inhabited} style={{backgroundColor: motelRoom.inhabited ? "lightgray" : "white",}}
                    value={motelRoom.id} key={index}>{motelRoom.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Số người ở" name="person_quantity" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Chọn ngày chuyển đến" name="rental_start_time" rules={rules1}>
          <DatePicker showTime={true}></DatePicker>
        </Form.Item>

        <Form.Item label="Email người thuê" name="tenant_email" rules={rules1}>
          <Input />
        </Form.Item>

        <Form.Item label="Ghi chú" name="note" rules={rules1}>
          <Input.TextArea showCount  maxLength={1000}/>
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

export default CreateRoomRentalDetail;
