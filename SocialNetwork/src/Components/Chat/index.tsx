import { EllipsisOutlined, MessageFilled, MessageOutlined, SearchOutlined } from '@ant-design/icons';
// import { SettingOutlined } from '@ant-design/icons';

import { Avatar, Badge, Button, Col, Dropdown, MenuProps, Row,Typography } from 'antd';
import "./Chat.css";
import { ConversationResponse, CreateConversationRequest, Friend } from '../../pages/chat/type';
import { useEffect, useRef, useState } from 'react';
import chatService from '../../services/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OpenChatBox } from '../../store/actions/ChatBoxAction';
import { DeleteMessageNotify, InitMessageNotify } from '../../store/actions/MessageNotifyAction';
const { Title, Text } = Typography;

const options = [
    {
        key: '1',
        label: (
            <div className='notify__item' onClick={(event) => event.stopPropagation()}>
                Xóa
            </div>
        ),
        extra: '⌘F',
    },
];


function Conversation(){

    const [allConversation,setAllConversation]=useState<ConversationResponse[]>([])


    const {user}=useSelector((state:RootState)=>state.authReducer);
    const {isOpen,currFriend}=useSelector((state:RootState)=>state.chatBoxReducer);
    const [inputValue, setInputValue] = useState<string>("");

    const [isSearchFriend,setIsSearchFriend]=useState(false)
    const [searchFriendList,setsearchFriendList]=useState<ConversationResponse[]>([])

    const {MessageNotifyList}=useSelector((state:RootState)=>state.messageNotifyReducer);
    const renderOneTime=useRef<number>(1);


    const dispatch=useDispatch();


    const handleStartChat = (email:string,name:string,avt:string,id:number|undefined) => {
        const friend:Friend={
            name,
            email,
            avt
        }
        dispatch(OpenChatBox({isOpen:true,currFriend:friend,room_id:id}));
    };

    useEffect(()=>{
        
        if(isSearchFriend){
            if(inputValue=='') setsearchFriendList([]);
            else (async()=>{ 
                const allconversation=await chatService.getUserChatRoomsWithKey(inputValue);
                setsearchFriendList(allconversation);
            })()
        }
        
    },[isSearchFriend,inputValue])


    const fetchAllConversation=async()=>{ 
        if(renderOneTime.current==1){
            const allconversation=await chatService.getUserChatRooms();
            setAllConversation(allconversation);
            renderOneTime.current+=1;
        }
    }

    const fetchAllMessageNotify=async()=>{ 
        const allmessageNotify=await chatService.getAllMessageNoitify();
        dispatch(InitMessageNotify(allmessageNotify));
    }
    useEffect(()=>{
        fetchAllMessageNotify()
    },[])

    useEffect(()=>{
        renderOneTime.current=1;
        fetchAllConversation()
    },[MessageNotifyList])
    

    const CreateDotNotify=(val:ConversationResponse)=>{
        const {user1_email,user2_email}=val;
        const friendEmail=user!.email==user1_email?user2_email:user1_email;

        if(MessageNotifyList[friendEmail]){//neu co danh sach chat
            if(currFriend&&currFriend.email==friendEmail&& isOpen){//neu ddang bat chat bot voi nguoi do thi khong hien dot
                dispatch(DeleteMessageNotify({content:"",sendAt:"",sendFrom:currFriend!.email,sendTo:''}))
                return false;
            }
            return true;// neu khong bat chatbox voi nguoi do thi hien thong bao
        }
        return false;// khong co trong danh sach chat thi ko hien dot
    }

    const FriendAim=(val:ConversationResponse):Friend=>{
        if(val.user1_email==user!.email){
            return{
                avt:val.user2_avt,
                name:val.user2_name,
                email:val.user2_email
            }
        }
        return{
            avt:val.user1_avt,
            name:val.user1_name,
            email:val.user1_email
        }
    }
    const previewMessage=(val:ConversationResponse)=>{
        const fr:Friend=FriendAim(val);
        if(!val.user_send_last_message){
            return "Bắt đầu chat"
        }
        const name=val.user_send_last_message==user!.email?"Bạn":fr.name.split(" ").pop();
        return name+": "+val.last_message;
    }

    const items: MenuProps['items'] = [];
    allConversation.map((val,index)=>{
        const item={
            key: index+'',
            label: (
                <Badge offset={[-5, 0]} dot={CreateDotNotify(val)}>
                    <Row align="middle" style={{width:200}}>
                        <Col span={3}>
                            <Avatar
                                className='avt'
                                size={48}
                                src={user!.email==val.user1_email?val.user2_avt:val.user1_avt} // Thay thế bằng ảnh avatar thật của bạn
                            />
                        </Col>
        
                        <Col span={17} offset={4} >
                            <Title ellipsis={{ tooltip: true }} level={5} style={{ margin: 0 }}>{user!.email==val.user1_email?val.user2_name:val.user1_name}</Title>
                            <Text ellipsis type="secondary">{previewMessage(val)}</Text>
                        </Col>
                    </Row>
                </Badge>   
            ),
            extra: <Dropdown
                        menu={{items:options}} 
                        trigger={["click"]}>
                            <Button type='text' onClick={(event) => event.stopPropagation()} icon={<EllipsisOutlined  style={{ fontSize: '20px', color: 'blue' }}/>}></Button>
                    </Dropdown>,

            onClick:()=>{
                if(user!.email==val.user2_email){
                    handleStartChat(val.user1_email,val.user1_name,val.user1_avt,val.id)
                    dispatch(DeleteMessageNotify({content:"",sendFrom:val.user1_email,sendAt:"",sendTo:""}))
                } 
                else {
                    handleStartChat(val.user2_email,val.user2_name,val.user2_avt,val.id)
                    dispatch(DeleteMessageNotify({content:"",sendFrom:val.user2_email,sendAt:"",sendTo:""}))
                }
            }
        }
        items.push(item)
        
    })

    const itemsSearch: MenuProps['items'] = [];
    searchFriendList.map((val,index)=>{
        const item={
            key: index+'',
            label: (
                <Row align="middle" style={{width:250,paddingTop:10}}>
                    <Col span={3}>
                        <Avatar
                            className='avt'
                            size={48}
                            src={user!.email==val.user1_email?val.user2_avt:val.user1_avt} // Thay thế bằng ảnh avatar thật của bạn
                        />
                    </Col>
    
                    <Col span={17} offset={4}>
                        <Title level={5} style={{ margin: 0 }}>{user!.email==val.user1_email?val.user2_name:val.user1_name}</Title>
                        <Text type="secondary">Chien: ok em</Text>
                    </Col>
                </Row>
                
            ),
            extra: <Dropdown
                        menu={{items:options}} 
                        trigger={["click"]}>
                            <Button type='text' onClick={(event) => event.stopPropagation()} icon={<EllipsisOutlined  style={{ fontSize: '20px', color: 'blue' }}/>}></Button>
                    </Dropdown>,

            onClick:()=>{
                if(user!.email==val.user2_email) handleStartChat(val.user1_email,val.user1_name,val.user1_avt,val.id)
                else handleStartChat(val.user2_email,val.user2_name,val.user2_avt,val.id)
            }
        }
        itemsSearch.push(item)
        
    })


    
    const handleclick=async()=>{
        const ob:CreateConversationRequest={
            emailSend:user?.email||"ok",
            emailToSend:inputValue,
        }
        const res=await chatService.createConversation(ob);

        if(res){
            const ok=res as ConversationResponse;
            setAllConversation((pre)=>[...pre,ok]);
            setIsSearchFriend(false);
            setInputValue("");
        }
    }
    


    return(
        <>
            <Dropdown menu={{items:isSearchFriend?itemsSearch:items}} 
                trigger={["click"]}
                onOpenChange={(open) => { if (open) fetchAllConversation(); }}
                dropdownRender={(menu)=>(
                    <>
                        
                        <div className='chat__dropdown'>
                            <Row >
                                <Col span={8} style={{fontSize:20,textAlign:'center',display:"flex",alignItems:'center',justifyContent:"center"}}>
                                    <MessageFilled/> <strong>Chat</strong> 
                                </Col>
                                <Col span={4} offset={10}>
                                    {isSearchFriend?<Button type='link' onClick={()=>{setInputValue("");setIsSearchFriend(false)}}>Hủy</Button>:
                                    <Button type='link'>View All</Button>}
                                </Col>
                            </Row>
                            <Row > 
                                <Col span={24}>
                                    <div className="chat-search-bar" >
                                        <SearchOutlined className="chat-search-icon" />
                                        <input 
                                            // onBlur={()=>{setInputValue("");setIsSearchFriend(false)}} 
                                                onFocus={()=>setIsSearchFriend(true)} 
                                                onChange={(e) => setInputValue(e.target.value)} 
                                                type="text" 
                                                placeholder="Tìm kiếm" 
                                                value={inputValue}
                                                className="chat-search-input" 
                                        />
                                        <Button onClick={handleclick} type='link'>Thêm</Button>
                                    </div>
                                </Col>
                            </Row>
                            <div className='chat__body' >
                                    {menu}
                            </div>
                        </div>
                    </>
                )}
                >
                <Badge dot={Object.values(MessageNotifyList).length>0?true:false}>
                    <Button type='text' onClick={()=>{setIsSearchFriend(false);setInputValue("")}} icon={<MessageOutlined style={{ fontSize: '20px', color: 'blue' }}/>}></Button>
                </Badge>
            </Dropdown>
        </>
    );
}

export default Conversation;