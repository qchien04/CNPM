import { configureStore } from "@reduxjs/toolkit";
import allReducer from "./reducer";

const store=configureStore({
    reducer:allReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;