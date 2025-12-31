import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, initializeAuthThunk } from "../thunk/authThunk";

// 로그인 후 유지되는 사용자 정보
export interface User {
    email: string;
    role: "MEMBER" | "SUBSCRIBER" | "ADMIN";
    registerStatus: "PENDING" | "APPROVED" | "REJECTED";
    accountStatus: string;
    bizNumber: string;
    organizationName: string;
    representativeName: string;
    contactName: string;
    approvedAt?: string | null;
}

// 인증 관련 전역 상태
interface AuthState {
    isAuthenticated: boolean; // 로그인 여부
    user: User | null;  // 로그인한 사용자 정보
    loading: boolean;  // 인증요청 진행중 여부
    initialized: boolean; // 인증 초기화 1회 이상 완료됐는지
    error: string | null;
}

// 초기상태
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    initialized: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // 로그아웃 처리
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
                state.initialized = true; // 인증 확인 완료
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(initializeAuthThunk.rejected, (state) => {
                state.loading = false;
                state.initialized = true;  // 실패해도 초기화 완료
                state.isAuthenticated = false;
                state.user = null;
            });

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
