import { createAsyncThunk } from "@reduxjs/toolkit";
import {apolloClient} from "@/lib/apolloClient";
import {GET_MY_WEBTOON} from "@/graphql/student/story/getWebtoonPage";

// 인증 초기화
export const studentInitThunk = createAsyncThunk(
    "studentAuth/init",
    async (_, { rejectWithValue }) => {
        try {
            await apolloClient.query({
                query: GET_MY_WEBTOON, // 이미 존재하는 보호 쿼리
                variables: { input: { page: 1, size: 1 } },
                fetchPolicy: "no-cache",
            });

            return true;
        } catch (e) {
            // 401 / 403 / GraphQL error
            return rejectWithValue("NOT_AUTHENTICATED");
        }
    }
);
