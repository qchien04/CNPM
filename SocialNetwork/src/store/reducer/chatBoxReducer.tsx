import { ChatBoxActionType, ChatBoxState } from "../../utils/type";

export interface normalizeChatBoxType {
    type: ChatBoxActionType;
    payload: ChatBoxState;
}

interface ChatBoxReducerHandler {
    OPEN(state: ChatBoxState, action: normalizeChatBoxType): ChatBoxState;
    CHANGE(state: ChatBoxState, action: normalizeChatBoxType): ChatBoxState;
    CLOSE(state: ChatBoxState): ChatBoxState;
    HIDE(state: ChatBoxState): ChatBoxState;
}

const reducerHandlers: ChatBoxReducerHandler = {
    OPEN(state, action): ChatBoxState {
        const { payload } = action;
        return {
            ...state,//not important
            ...payload,
            isOpen: true,
        };
    },

    CHANGE(state, action): ChatBoxState {
        const { payload } = action;
        return {
            ...state,//not important
            ...payload,
            isOpen: true,
        };
    },

    CLOSE(state): ChatBoxState {
        return {
            ...state,//not important
            currFriend:null,
            isOpen: false,
        };
    },

    HIDE(state): ChatBoxState {
        return {
            ...state,
            isOpen: false,
        };
    },
};

export const initialChatBox: ChatBoxState = {
    isOpen: false,
    currFriend:null,
};

export function chatBoxReducer(state = initialChatBox, action: normalizeChatBoxType): ChatBoxState {
    if (!reducerHandlers[action.type]) return state;

    return reducerHandlers[action.type](state,action);
}
