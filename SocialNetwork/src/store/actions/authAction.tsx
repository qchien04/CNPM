import { AuthActionType, AuthState, PayloadAction } from "../../utils/type";




export function initialize(payload: AuthState): PayloadAction<AuthState> {
    return {
        type: AuthActionType.INITIALIZE,
        payload:payload,
    };
}
  
export function signIn(payload: AuthState): PayloadAction<AuthState> {
    return {
      type: AuthActionType.SIGN_IN,
      payload,
    };
}
  
export function signOut(): PayloadAction<AuthState> {
    localStorage.removeItem('ACCESS_TOKEN');
  
    return { type: AuthActionType.SIGN_OUT, payload: { user: null } };
}