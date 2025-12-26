import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, initializeAuthThunk } from "../thunk/authThunk";

export interface User {
    email: string;
    role: "MEMBER" | "SUBSCRIBER" | "ADMIN";
    registerStatus: "PENDING" | "APPROVED" | "REJECTED";
    accountStatus: string;
    bizNumber: string;
    organizationName: string;
    contactName: string;
    approvedAt?: string | null;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // 로그인
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "LOGIN_FAILED";
            })

            // 초기 인증 (새로고침)
            .addCase(initializeAuthThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(initializeAuthThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(initializeAuthThunk.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            });

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
