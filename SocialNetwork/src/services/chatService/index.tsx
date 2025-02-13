import axiosClient from '../../config/axiosconfig';
import { ConversationResponse, CreateConversationRequest, Message, MessageNotifyResponse } from '../../pages/chat/type';
import { APIResponse } from '../roomManagerService';



const chatService = {


  createConversation: async (req:CreateConversationRequest): Promise<APIResponse|ConversationResponse> => {
    try {
      const {data} = await axiosClient.post('/conversation/create',req);
      if(data.status){
        // throw new Error("Can not create conversation");
        console.log("Can not create conversation");
        return data;
      }
      else{
        return data;
      }
    } catch (error) {
      console.error("Can not create conversation");
      throw error; 
    }
  },
  getUserChatRooms: async (): Promise<ConversationResponse[]> => {
    try {
      const {data} = await axiosClient.get('/conversation/allConversation');
        return data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error; 
    }
  },
  getUserChatRoomsWithKey: async (key:string): Promise<ConversationResponse[]> => {
    try {
      const {data} = await axiosClient.get(`/conversation/findConversation?key=${key}`);
        return data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error; 
    }
  },
  getMessageRoom: async (email_send:string,email_receive:string): Promise<Message[]> => {
    try {
      const {data} = await axiosClient.get(`/message/allMessage?email1=${email_send}&email2=${email_receive}`);
        return data;
      }
    catch (error) {
      console.error('Error fetching MessageRoom:', error);
      throw error; 
    }
  },

  getAllMessageNoitify: async (): Promise<MessageNotifyResponse[]> => {
    try {
      const {data} = await axiosClient.get(`/messageNotify/allMessageNotify`);
        return data;
      }
    catch (error) {
      console.error('Error fetching getAllMessageNoitify:', error);
      throw error; 
    }
  },

  deleteMessageNoitifyByEmailSend: async (email:string): Promise<APIResponse> => {
    try {
      const {data} = await axiosClient.delete(`/messageNotify/deleteMessageNotify?emailSend=${email}`);
        return data;
      }
    catch (error) {
      console.error('Error fetching getAllMessageNoitify:', error);
      
      throw error; 
    }
  },
};


export default chatService;