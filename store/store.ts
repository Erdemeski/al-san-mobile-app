// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // authSlice içindeki reducer'ı içe aktar

const store = configureStore({
  reducer: {
    auth: authReducer, // auth reducer'ı ekledik
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
