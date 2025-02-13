import { MessageNotifyResponse } from "../../pages/chat/type";
import { MessageNotifyActionType} from "../../utils/type";



export function InitMessageNotify(payload: MessageNotifyResponse[]) {
    return {
        type: MessageNotifyActionType.INIT,
        payload:payload,
    };
}

export function PushMessageNotify(payload: MessageNotifyResponse) {
    return {
        type: MessageNotifyActionType.PUSH,
        payload:payload,
    };
}

export function DeleteMessageNotify(payload: MessageNotifyResponse) {
    return {
        type: MessageNotifyActionType.DELETE,
        payload:payload,
    };
}
