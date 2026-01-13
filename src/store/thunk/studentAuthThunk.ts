// src/store/thunk/studentAuthThunk.ts
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apolloClient} from "@/lib/apolloClient";
import { SERVICE_ACCESS_LOGIN, SERVICE_ACCESS_LOGOUT, GET_MY_ACCESS_ID_PAGE} from "@/graphql/student/auth/serviceAccess";

// 인증 초기화(새로고침 했을 때 대응)
export const initializeStudentAuthThunk = createAsyncThunk(
    "studentAuth/initialize",
    async (_, { rejectWithValue }) => {
        try {
            await apolloClient.query({
                query: GET_MY_ACCESS_ID_PAGE,
                variables: {
                    input: { page: 1, size: 1 }, // 최소 호출
                },
                fetchPolicy: "no-cache",
            });
            return true;
        } catch {
            return rejectWithValue("NO_SESSION");
        }
    }
);

// 로그인
export const studentLoginThunk = createAsyncThunk(
    "studentAuth/login",
    async (decryptedKey: string, { rejectWithValue }) => {
        try {
            const res = await apolloClient.mutate({
                mutation: SERVICE_ACCESS_LOGIN,
                variables: {
                    input: { decryptedKey },
                },
            });

            if (!res.data?.serviceAccessLogin?.result) {
                return rejectWithValue("LOGIN_FAILED");
            }

            return true;
        } catch {
            return rejectWithValue("LOGIN_FAILED");
        }
    }
);

//로그아웃
export const studentLogoutThunk = createAsyncThunk(
    "studentAuth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await apolloClient.mutate({
                mutation: SERVICE_ACCESS_LOGOUT,
            });
            return true;
        } catch {
            return rejectWithValue("LOGOUT_FAILED");
        }
    }
);
