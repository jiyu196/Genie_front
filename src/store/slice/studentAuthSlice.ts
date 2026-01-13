import { createSlice } from "@reduxjs/toolkit";
import { studentLoginThunk, studentLogoutThunk } from "@/store/thunk/studentAuthThunk";

interface StudentAuthState {
    isLoggedIn: boolean;
    loading: boolean;
}

const initialState: StudentAuthState = {
    isLoggedIn: false,
    loading: false,
};

const studentAuthSlice = createSlice({
    name: "studentAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 로그인
            .addCase(studentLoginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentLoginThunk.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = true;
            })
            .addCase(studentLoginThunk.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
            })

            // 로그아웃
            .addCase(studentLogoutThunk.fulfilled, (state) => {
                state.isLoggedIn = false;
            });
    },
});

export default studentAuthSlice.reducer;
