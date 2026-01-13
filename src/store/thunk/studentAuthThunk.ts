import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "@/lib/apolloClient";
import { SERVICE_ACCESS_LOGIN, SERVICE_ACCESS_LOGOUT } from "@/graphql/student/auth/serviceAccess";

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

// 로그아웃
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
