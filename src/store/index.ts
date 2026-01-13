import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import studentAuthReducer from "./slice/studentAuthSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,  // b2b 인증
        studentAuth: studentAuthReducer, // 학생 인증
    },
});

// 타입 추론용 (나중에 selector에서 사용할)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;