import { ChatBoxActionType, ChatBoxState } from "../../utils/type";



export function OpenChatBox(payload: ChatBoxState) {
    return {
        type: ChatBoxActionType.OPEN,
        payload:payload,
    };
}

export function HideChatBox() {
    return {
        type: ChatBoxActionType.HIDE,
    };
}

export function ChangeChatBox(payload: ChatBoxState) {
    return {
        type: ChatBoxActionType.CHANGE,
        payload:payload,
    };
}

export function CloseChatBox() {
    return {
        type: ChatBoxActionType.CLOSE,
    };
}
  