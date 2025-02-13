// src/pages/RoomDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Tag, Descriptions, Image, Button } from "antd";
import { MotelRoom } from "../RoomManager/type";
import { MotelRoomService } from "../../services/roomManagerService";
import {WechatWorkOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import chatService from "../../services/chatService";
import { CreateConversationRequest } from "../chat/type";
import { CloseChatBox, OpenChatBox } from "../../store/actions/ChatBoxAction";
const { Title, Text } = Typography;


const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motelRoom,setMotelRoom]=useState<MotelRoom|null>(null);
  const {user}=useSelector((state:RootState)=>state.authReducer);
  const disPatch=useDispatch();
  const clickChatHandle=async(owner:string|undefined)=>{
    if(owner){
      disPatch(CloseChatBox({isOpen:false}))
      const ob:CreateConversationRequest={
        emailSend:user?.email||"ok",
        emailToSend:owner,
      }
      const res=await chatService.createConversation(ob);
      if(res){
        disPatch(OpenChatBox({isOpen:true}))
      }
    }

  }

  const fetchData=async()=>{
    const room: MotelRoom  =await MotelRoomService.getMotelRoom(id);
    setMotelRoom(room)
  }
  useEffect(()=>{
    fetchData()
  })

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Card hoverable style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={2}>{motelRoom?.name}</Title>
        <Image src={motelRoom?.image_url} alt={motelRoom?.name} width="100%" height={350} style={{ borderRadius: "8px" }} />

        <Descriptions bordered column={1} style={{ marginTop: "20px" }}>
          <Descriptions.Item label="Loại phòng">
            <Tag color="blue">{motelRoom?.type_room}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Giá thuê">
            <Text strong>{motelRoom?.price_per_month.toLocaleString()} VNĐ/tháng</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Đặt cọc">
            <Text strong>{motelRoom?.deposit.toLocaleString()} VNĐ</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {motelRoom?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Diện tích">
            {motelRoom?.area} m²
          </Descriptions.Item>
          <Descriptions.Item label="Số khách tối đa">
            {motelRoom?.max_guests}
          </Descriptions.Item>
          <Descriptions.Item label="Số giường">
            {motelRoom?.bed_quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {motelRoom?.availability_status === "Còn trống" ? (
              <Tag color="green">Còn trống</Tag>
            ) : (
              <Tag color="red">Đã thuê</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">{motelRoom?.description}</Descriptions.Item>
          <Descriptions.Item label="Chủ phòng">
            <Text strong>{motelRoom?.owner}</Text>
            {motelRoom?.owner==user?.email?<></>:
            <Button icon={<WechatWorkOutlined />} style={{marginLeft:10}}
                    onClick={()=>clickChatHandle(motelRoom?.owner)}
                    >Nhắn tin
            </Button>}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default RoomDetail;
