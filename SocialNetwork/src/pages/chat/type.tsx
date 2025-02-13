export type ConversationResponse={
    id?:number;
    user1_email:string,
    user2_email:string,
    user1_avt:string,
    user2_avt:string,
    user1_name:string,
    user2_name:string,
    last_message:string,
    user_send_last_message:string
    
    
  }

export type CreateConversationRequest={
  emailSend:string,
  emailToSend:string,
}


export type Message={
  room_id?:number,
  id?:number,
  receive_email:string,
  send_email:string,
  content:string,
  time_send:string,
  is_image:boolean,
  is_read:boolean,
  image_url?:string,
}
export type Typing={
  name:string,
  emailSend:string,
  type:string,
  emailReceive:string,
}

export interface Friend{
  name:string,
  email:string,
  avt:string,
  room_id?:number,
}


export interface MessageNotifyResponse{
  sendFrom:string,
  sendTo:string,
  content:string,
  sendAt:string,
}