import { Action } from "redux";
import { Friend, MessageNotifyResponse } from "../pages/chat/type";

export interface User{
    email:string;
    roles:string[];
    permissions:string[];
    name:string;
    avt?:string;
}
export interface AuthState{
    isAuthenticated?:boolean;
    isInitialized?:boolean;
    user:User|null;
}

export enum AuthActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
  }
  
export interface PayloadAction<T> extends Action<string>{
    type: AuthActionType;
    payload: T;
  }
  
  
export const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
  };
  

export type normalizeAuthType={
    type:string,
    payload:AuthState,
  }
export type ChatBoxState={
  isOpen:boolean,
  room_id?:number,
  currFriend:Friend|null,
}



export enum ChatBoxActionType {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
  CHANGE='CHANGE',
  HIDE='HIDE'
}


export enum MessageNotifyActionType {
  INIT='INIT',
  PUSH = 'PUSH',
  DELETE = 'DELETE',
}



export type MessageNotifyState={
  MessageNotifyList:Record<string, MessageNotifyResponse>
}