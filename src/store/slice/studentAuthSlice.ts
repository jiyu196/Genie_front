// src/store/slice/studentAuthSlice.ts
import {createSlice} from "@reduxjs/toolkit";
import {initializeStudentAuthThunk, studentLoginThunk, studentLogoutThunk} from "@/store/thunk/studentAuthThunk";

interface StudentAuthState {
    isLoggedIn: boolean;
    initialized: boolean;
    loading: boolean;
}

const initialState: StudentAuthState = {
    isLoggedIn: false,
    initialized: false,
    loading: false,
};

const studentAuthSlice = createSlice({
    name: "studentAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 초기화
            .addCase(initializeStudentAuthThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeStudentAuthThunk.fulfilled, (state) => {
                state.loading = false;
                state.initialized = true;
                state.isLoggedIn = true;
            })
            .addCase(initializeStudentAuthThunk.rejected, (state) => {
                state.loading = false;
                state.initialized = true;
                state.isLoggedIn = false;
            })

            // 로그인
            .addCase(studentLoginThunk.fulfilled, (state) => {
                state.isLoggedIn = true;
            })

            // 로그아웃
            .addCase(studentLogoutThunk.fulfilled, (state) => {
                state.isLoggedIn = false;
            });
    },
});

export default studentAuthSlice.reducer;