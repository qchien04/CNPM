import { MessageNotifyResponse } from "../../pages/chat/type";
import chatService from "../../services/chatService";
import { MessageNotifyActionType, MessageNotifyState } from "../../utils/type";

export interface normalizeMessageNotifyType {
    type: MessageNotifyActionType;
    payload: MessageNotifyResponse|MessageNotifyResponse[];
}

interface MessageNotifyReducerHandler {
    INIT(state: MessageNotifyState, action: normalizeMessageNotifyType): MessageNotifyState;
    PUSH(state: MessageNotifyState, action: normalizeMessageNotifyType): MessageNotifyState;
    DELETE(state: MessageNotifyState, action: normalizeMessageNotifyType): MessageNotifyState;
}

const reducerHandlers: MessageNotifyReducerHandler = {
    PUSH(state, action) {
        const payload = action.payload as MessageNotifyResponse; 
        const newMessageNotifyList= {
            ...state.MessageNotifyList, 
            [payload.sendFrom]: payload,  // Lưu bằng key-value trong object
        }
        return {
            MessageNotifyList:newMessageNotifyList
        };
    },

    DELETE(state, action) {
        const payload = action.payload as MessageNotifyResponse; 
        deleteMessageNotify(payload.sendFrom)
        const newMessageNotifyList = { ...state.MessageNotifyList };
        delete newMessageNotifyList[payload.sendFrom];

        return { MessageNotifyList:newMessageNotifyList };
    },

    INIT(state, action) {
        const payload = action.payload as MessageNotifyResponse[]; 
        
        const newMessageNotifyList = payload.reduce((acc, val) => {
            return { 
                ...acc,
                [val.sendFrom]: val,
            };
        }, { ...state.MessageNotifyList });

        return { MessageNotifyList: newMessageNotifyList };
        
    }


};

const initialMessageNotify: MessageNotifyState = {
    MessageNotifyList: {},
};

export function messageNotifyReducer(state = initialMessageNotify, action: normalizeMessageNotifyType): MessageNotifyState {
    return reducerHandlers[action.type] ? reducerHandlers[action.type](state, action) : state;
}


const deleteMessageNotify= async(email:string)=>{
    const api=await chatService.deleteMessageNoitifyByEmailSend(email);
    console.log(api+"=======================================================")
}