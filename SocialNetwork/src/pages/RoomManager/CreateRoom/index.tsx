import { Button, Form, Input, InputNumber, message, Select, Switch } from "antd";
import { Outlet } from "react-router-dom";
import { Amenity, MotelRoom } from "../type";
import { useEffect, useState } from "react";
import { AmenityService, APIResponse, MotelRoomService } from "../../../services/roomManagerService";

const { Option } = Select;



function CreateRoom() {
  const [form] = Form.useForm<MotelRoom>();
  const [messageApi, contextHolder] = message.useMessage();
  const [amenityList,setAmenityList] =useState<Amenity[]>([]);

  const fetchAmenity=async()=>{
    const amenitylist:Amenity[]=await AmenityService.getAllAmenity();
    setAmenityList(amenitylist);
  }

  useEffect(()=>{
     fetchAmenity();
  },[]);

  const handleSubmit = async (values: MotelRoom) => {
    console.log(values);
    const response:APIResponse = await MotelRoomService.createMotelRoom(values);
    if (response.status) {
      messageApi.open({
        type: "success",
        content: "Tạo phòng thành công",
        duration: 5,
      });
      //form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Tạo phòng không thành công",
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
      <Form<MotelRoom>
        form={form}
        name="create-room"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên phòng" name="name" rules={rules1}>
          <Input />
        </Form.Item>

        <Form.Item label="Loại phòng" name="type_room" rules={rules1}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá/Tháng" name="price_per_month" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Cọc" name="deposit" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Trạng thái phòng" name="availability_status" rules={rules1}>
          <Input />
        </Form.Item>

        <Form.Item label="Giá Điện/Số" name="electricity_rate" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Giá nước/Khối" name="water_rate" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={rules1}>
          <Input />
        </Form.Item>

        <Form.Item label="Diện tích" name="area" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Số lượng giường" name="bed_quantity" rules={rules1}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Số người tối đa" name="max_guests" rules={rules1}>
          <InputNumber min={1} max={10} />
        </Form.Item>

        
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item label="Dịch vụ" name="amenities">
          <Select
            style={{ width: "100%" }}
            mode="multiple"
            allowClear
          >
            {amenityList?.map((amenity,index)=>(
              <Option value={amenity.id} key={index}>{amenity.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          valuePropName="checked"
          label="Hết phòng?"
          name="inhabited"
        >
          <Switch checkedChildren="Hết phòng" unCheckedChildren="Còn phòng" />
        </Form.Item>
{/* 
        <Form.Item
          valuePropName="checked"
          label="Loại phòng"
          name="typeRoom"
        >
          <Switch checkedChildren="Vip" unCheckedChildren="Thường" />
        </Form.Item> */}

        <Form.Item label="Tầng" name="floor" rules={rules1}>
          <InputNumber />
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

export default CreateRoom;
