// import { Col, Image, Row } from "antd";
// import './roomchatlistbar.css';


// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { ConversationResponse } from "./type";
// import { Friend } from ".";


// interface props{
//     allConversation:ConversationResponse[],
//     currConversation:ConversationResponse|null,
//     changeConversationHandle:(friend:Friend,currconversation:ConversationResponse)=>void,
// }

// const RoomChatListBar:React.FC<props>=({allConversation,currConversation,changeConversationHandle})=>{
//     const {user}=useSelector((state:RootState)=>state.authReducer);
//     const currEmail=user?.email;

//     const handleChangRoom=(roomchat:ConversationResponse)=>{
//         if(user?.email==roomchat.user1_email){
//             const friend={
//                 avt:roomchat.user2_avt,
//                 email:roomchat.user2_email,
//                 name:roomchat.user2_name,
//             }
//             changeConversationHandle(friend,roomchat);
//         }else{
//             const friend={
//                 avt:roomchat.user1_avt,
//                 email:roomchat.user1_email,
//                 name:roomchat.user1_name,
//             }
//             changeConversationHandle(friend,roomchat);
//         }
//     }


//     return(
//         <>
//             <div className="scroll-bar">
//                 {allConversation.map((roomchat,index)=>(
//                     <Row key={index} 
//                         onClick={()=>handleChangRoom(roomchat)}
//                         className={`box-chat${roomchat.id === currConversation?.id ? " active" : ""}`}>
//                         <Col span={6}>
//                             <Image 
//                                 preview={false}
//                                 className="avt-user"
//                                 src={roomchat.user1_email!=currEmail?
//                                     roomchat.user1_avt:
//                                     roomchat.user2_avt}
//                                 alt="Placeholder Image" 
//                             />
//                         </Col>
//                         <Col span={18} className="room-name">
//                                         {roomchat.user1_email!=currEmail?
//                                         roomchat.user1_name:
//                                         roomchat.user2_name}
//                         </Col>
//                     </Row>
//                 ))}
//             </div>
        
//         </>
//     )






// }

// export default RoomChatListBar;