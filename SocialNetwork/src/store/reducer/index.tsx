import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { chatBoxReducer } from "./chatBoxReducer";
import { messageNotifyReducer } from "./messageNotifyReducer";

const allReducer=combineReducers({
    authReducer,
    chatBoxReducer,
    messageNotifyReducer,
    
    //other reducer
});

export default allReducer;