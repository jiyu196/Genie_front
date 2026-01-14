import { createAsyncThunk } from "@reduxjs/toolkit";

// 인증 초기화
export const studentInitThunk = createAsyncThunk(
    "studentAuth/init",
    async () => {
        // 서버에 물어볼 API가 없으므로
        // "초기화 완료"만 의미
        return true;
    }
);
