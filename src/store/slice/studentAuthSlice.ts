import { createSlice } from "@reduxjs/toolkit";
import { studentLoginThunk, studentLogoutThunk } from "@/store/thunk/studentAuthThunk";
import {studentInitThunk} from "@/store/thunk/studentInitThunk";

interface StudentAuthState {
    isLoggedIn: boolean;
    loading: boolean;
    initialized: boolean;
}

const initialState: StudentAuthState = {
    isLoggedIn: false,
    loading: false,
    initialized: false,
};

const studentAuthSlice = createSlice({
    name: "studentAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 초기화
            .addCase(studentInitThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentInitThunk.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.initialized = true;
            })
            .addCase(studentInitThunk.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.initialized = true;
            })

        // 로그인
            .addCase(studentLoginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentLoginThunk.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.initialized = true;
            })
            .addCase(studentLoginThunk.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.initialized = true;
            })

            // 로그아웃
            .addCase(studentLogoutThunk.fulfilled, (state) => {
                state.isLoggedIn = false;
            });
    },
});

export default studentAuthSlice.reducer;
