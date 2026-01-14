// src/store/thunk/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/lib/apolloClient";
import {LOGIN_MUTATION, LOGOUT_MUTATION} from "@/graphql/b2b/auth/login";
import { ME_QUERY } from "@/graphql/b2b/auth/me";
import {logout, User} from "@/store/slice/authSlice";

// 로그인 1. login mutation -> 쿠키발급 / 2. me query -> 사용자 정보(조회)
export const loginThunk = createAsyncThunk<
    User | null,
    { email: string; password: string },
    { rejectValue: { code: string; message: string } }
>(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const loginRes = await apolloClient.mutate({
                mutation: LOGIN_MUTATION,
                variables: { input: payload },
            });

            if (!loginRes.data?.login?.login) {
                return rejectWithValue({
                    code: "LOGIN_FAILED",
                    message: "아이디 또는 비밀번호가 올바르지 않습니다.",
                });
            }

            const meRes = await apolloClient.query({
                query: ME_QUERY,
                fetchPolicy: "no-cache",
            });

            if (!meRes.data?.me) {
                return rejectWithValue({
                    code: "NO_SESSION",
                    message: "로그인 세션을 확인할 수 없습니다.",
                });
            }

            return meRes.data.me;
        } catch (e: any) {
            // GraphQL 에러 메시지
            const graphQLErrorMessage =
                e?.graphQLErrors?.[0]?.message;

            return rejectWithValue({
                code: "LOGIN_FAILED",
                message:
                    graphQLErrorMessage ||
                    "아이디 또는 비밀번호가 올바르지 않습니다.",
            });
        }
    }
);


// 앱, 웹 시작 시 인증 초기화. 쿠키 있으면 성공, 없으면 에러남
export const initializeAuthThunk = createAsyncThunk<
    User | null,
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

    // // login page에서 넣었던 세션 스토리지 지움
    //     sessionStorage.removeItem("b2b_session");
    // redux 상태 초기화
        dispatch(logout());
    }
);
