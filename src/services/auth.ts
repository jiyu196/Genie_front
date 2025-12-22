// 로그인
export async function loginApi(payload: {
    email: string;
    password: string;
}) {
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include", // 쿠키 저장 필수
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("LOGIN_FAILED");
    return res.json();
}

// refresh (초기화 / 만료 시)
export async function refreshApi() {
    const res = await fetch("http://localhost:8080/auth/refresh", {
        method: "POST",
        credentials: "include", // efresh 쿠키 자동 전송
    });

    if (!res.ok) throw new Error("REFRESH_FAILED");
    return res.json();
}

// src/services/business.ts
import { CHECK_BIZ_NUMBER } from "@/graphql/business/checkBizNumber";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const login = async (
    client: ApolloClient<NormalizedCacheObject>,
    input: {
        bizNumber: string;
        representativeName: string;
        openingDate: string;
    }
) => {
    return client.mutate({
        mutation: CHECK_BIZ_NUMBER,
        variables: { input },
        fetchPolicy: "no-cache",
    });
};