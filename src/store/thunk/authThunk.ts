// src/store/thunk/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/lib/apolloClient";
import {LOGIN_MUTATION, LOGOUT_MUTATION} from "@/graphql/auth/login";
import { ME_QUERY } from "@/graphql/auth/me";
import {logout, User} from "@/store/slice/authSlice";

// 로그인 1. login mutation -> 쿠키발급 / 2. me query -> 사용자 정보(조회)
export const loginThunk = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const loginRes = await apolloClient.mutate({
                mutation: LOGIN_MUTATION,
                variables: { input: payload },
            });

            if (!loginRes.data?.login?.login) {
                return rejectWithValue("LOGIN_FAILED");
            }

            const meRes = await apolloClient.query({
                query: ME_QUERY,
                fetchPolicy: "no-cache",
            });

            return meRes.data.me;
        } catch {
            return rejectWithValue("LOGIN_FAILED");
        }
    }
);

// 앱, 웹 시작 시 인증 초기화. 쿠키 있으면 성공, 없으면 에러남
export const initializeAuthThunk = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(
    "auth/initialize",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apolloClient.query({
                query: ME_QUERY,
                fetchPolicy: "no-cache",
            });
            return res.data.me;
        } catch {
            return rejectWithValue("NO_SESSION");
        }
    }
);

// 로그아웃
export const logoutThunk = createAsyncThunk(
"auth/logout",
    async (_, { dispatch }) => {
    await apolloClient.mutate({
        mutation: LOGOUT_MUTATION,
    });

    // redux 상태 초기화
        dispatch(logout());
    }
);
