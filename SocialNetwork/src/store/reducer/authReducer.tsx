import { AuthState, AuthActionType } from "../../utils/type";

// Giả sử normalizeAuthType là một kiểu hành động được định nghĩa như sau
export interface normalizeAuthType {
    type: AuthActionType;
    payload: AuthState;
}

interface ReducerHandler {
    INITIALIZE(state: AuthState, action: normalizeAuthType): AuthState;
    SIGN_IN(state: AuthState, action: normalizeAuthType): AuthState;
    SIGN_OUT(state: AuthState): AuthState;
}

const reducerHandlers: ReducerHandler = {
    INITIALIZE(state: AuthState, action: normalizeAuthType): AuthState {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },

    SIGN_IN(state: AuthState, action: normalizeAuthType): AuthState {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },

    SIGN_OUT(state: AuthState): AuthState {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    },
};

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

// Đảm bảo action có kiểu normalizeAuthType đúng
export function authReducer(state = initialState, action: normalizeAuthType): AuthState {
    if (!reducerHandlers[action.type]) return state;

    return reducerHandlers[action.type](state, action);
}
