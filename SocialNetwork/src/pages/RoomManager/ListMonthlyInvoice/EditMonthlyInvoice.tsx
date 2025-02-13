import { Button, DatePicker, Modal, notification, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { MotelRoom, RoomentalDetailOperation, RoomRentalDetailResponse } from "../type";
import { MotelRoomService, RoomRentalDetailService } from "../../../services/roomManagerService";
import moment from "moment";

const { Option } = Select;

const EditMonthlyInvoice: React.FC<RoomentalDetailOperation> = (props) => {
  const { record, onReload } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm<RoomRentalDetailResponse>();
  const [notifyApi, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [motelRoomList,setMotelRoomList] =useState<MotelRoom[]>([]);

  const fetchMotelRoom=async()=>{
    const res:MotelRoom[]=await MotelRoomService.getMyMotelRoom();
    setMotelRoomList(res);
  }

  useEffect(()=>{
    fetchMotelRoom();
  },[]);


  const handleSubmit = async (values: RoomRentalDetailResponse) => {
    values.id = record.id;
    try {
      setSpinning(true);
      console.log(values);
      const response = await RoomRentalDetailService.updateRoomRentalDetail(record.id ? record.id : 0, values);
      console.log(response);
      if (response) {
        notifyApi.success({
          message: "Cập nhật thành công",
          description: `Bạn đã cập nhật thành công hợp đồng`,
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
  const handleChangeRoom=(e:number)=>{
    form.setFieldsValue({
      motelRoom_id:e,
    });
  }
  return (
    <>
      <Button onClick={handleShowModal} type="primary" size="small" icon={<EditOutlined />} />
      <Modal open={showModal} footer={null} onCancel={handleCancel}>
        <Spin spinning={spinning} tip="Đang cập nhật...">
          <h2>Chỉnh sửa</h2>
          {contextHolder}

          <Form form={form} name={"edit-roomrentaldetail"+record.id}
             initialValues={{
              ...record,
              rental_start_time: record.rental_start_time ? moment(record.rental_start_time) : null,
              create_time: record.create_time ? moment(record.create_time) : null,
            }}
             layout="vertical" onFinish={handleSubmit}>


            <Form.Item label="Mã" name="id">
              <InputNumber disabled={true}/>
            </Form.Item>
            
            <Form.Item label="Tên phòng" name="motelRoom_name" rules={rules1}>
              <Select
                style={{ width: "100%" }}
                allowClear
                onChange={handleChangeRoom}
              >
                {motelRoomList?.map((motelRoom,index)=>(
                  <Option disabled={motelRoom.inhabited&&record.motelRoom_id!=motelRoom.id} 
                        style={{backgroundColor: (motelRoom.inhabited&&record.motelRoom_id!=motelRoom.id) ? "lightgray" : "white",}}
                        value={motelRoom.id} key={index}>{motelRoom.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Mã phòng" name="motelRoom_id" rules={rules1}>
              <Input disabled={true}></Input>
            </Form.Item>

            <Form.Item label="Số người ở" name="person_quantity" rules={rules1}>
              <InputNumber />
            </Form.Item>

            <Form.Item label="Chọn ngày chuyển đến" name="create_time" rules={rules1}>
              <DatePicker disabled={true} showTime={true}></DatePicker>
            </Form.Item>

            <Form.Item label="Chọn ngày chuyển đến" name="rental_start_time" rules={rules1}>
              <DatePicker showTime={true}></DatePicker>
            </Form.Item>

            <Form.Item label="Email người thuê" name="tenant_email" rules={rules1}>
              <Input />
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              label="Đã hết hiệu lực?"
              name="expire"
            >
              <Switch checked={record.expire} checkedChildren="Hết hiệu lực" unCheckedChildren="Còn hiệu lực" />
            </Form.Item> 

            <Form.Item label="Ghi chú" name="note" rules={rules1}>
              <Input.TextArea showCount  maxLength={1000}/>
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

export default EditMonthlyInvoice;
