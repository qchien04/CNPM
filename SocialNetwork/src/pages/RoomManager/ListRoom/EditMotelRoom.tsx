import { Button, Modal, notification, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { Amenity, MotelRoom, MotelRoomOperation } from "../type";
import { AmenityService, MotelRoomService } from "../../../services/roomManagerService";

const { Option } = Select;

const EditMotelRoom: React.FC<MotelRoomOperation> = (props) => {
  const { record, onReload } = props;
  const IdAmenityList:number[]=[];
    record.amenities.map((val)=>{
        IdAmenityList.push(val);
    })
    record.amenities=IdAmenityList;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [notifyApi, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [amenityList, setAmenityList] = useState<Amenity[]>([]);

  // Fetch amenities only on component mount
  const fetchAmenity = async () => {
    const amenityList: Amenity[] = await AmenityService.getAllAmenity();
    setAmenityList(amenityList);
  };

  useEffect(() => {
    fetchAmenity();
  }, []); // Empty dependency array ensures this runs only once after initial render

  const handleSubmit = async (values: MotelRoom) => {
    values.id = record.id;
    try {
      setSpinning(true);
      console.log(values);
      const response = await MotelRoomService.UpdateMotelRoom(record.id ? record.id : 0, values);
      console.log(response);
      if (response) {
        notifyApi.success({
          message: "Cập nhật thành công",
          description: `Bạn đã cập nhật thành công phòng ${record.name}`,
          duration: 10,
          placement: 'bottomRight',
        });
        setShowModal(false);
        onReload();
      } else {
        notifyApi.error({
          message: "Cập nhật thất bại",
          description: `Cập nhật không thành công`,
          duration: 5,
        });
      }
    } catch (error) {
      console.error("Error updating motel room:", error);
      notifyApi.error({
        message: "Lỗi hệ thống",
        description: `Đã xảy ra lỗi, vui lòng thử lại sau.`,
        duration: 5,
      });
    } finally {
      setSpinning(false);
    }
  };

  const rules1 = [
    {
      required: true,
      message: 'Bắt buộc!',
    },
  ];

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  return (
    <>
      <Button onClick={handleShowModal} type="primary" size="small" icon={<EditOutlined />} />
      <Modal open={showModal} footer={null} onCancel={handleCancel}>
        <Spin spinning={spinning} tip="Đang cập nhật...">
          <h2>Chỉnh sửa</h2>
          {contextHolder}
          <Form form={form} name={"edit-room"+record.id} initialValues={record} layout="vertical" onFinish={handleSubmit}>
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
              <Select style={{ width: "100%" }} mode="multiple" allowClear>
                {amenityList.map((amenity,index) => (
                  <Option value={amenity.id} key={index}>
                    {amenity.name}
                  </Option>
                  
                ))}
              </Select>
            </Form.Item>

            <Form.Item valuePropName="checked" label="Hết phòng ?" name="inhabited">
              <Switch checkedChildren="Hết phòng" unCheckedChildren="Còn phòng" />
            </Form.Item>

            <Form.Item label="Tầng" name="floor" rules={rules1}>
              <InputNumber />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default EditMotelRoom;
