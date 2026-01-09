"use client";

import { createContext, useContext, useState } from "react";

type StudentAuthContextType = {
    // 기본
    isLoggedIn: boolean;
    initialized: boolean;

    // 권한 판단
    memberStatus: "APPROVED" | "PENDING" | "REJECTED";
    subscriptionStatus: "ACTIVE" | "NONE" | "EXPIRED";
    hasServiceAccess: boolean;

    // 액션
    login: () => void;
    logout: () => void;
};

const StudentAuthContext = createContext<StudentAuthContextType | null>(null);

// 학생 로그인 상태 / 로그인, 로그아웃/ 서비스 키 인증결과 담당
export function StudentAuthProvider({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initialized, setInitialized] = useState(true);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <StudentAuthContext.Provider
            value={{
                // 기본
                isLoggedIn,
                initialized: true,

                // 학습 권한
                memberStatus: "PENDING",
                subscriptionStatus: "NONE",
                hasServiceAccess: false,

                login: () => setIsLoggedIn(true),
                logout: () => setIsLoggedIn(false),
        }}
        >
            {children}
        </StudentAuthContext.Provider>
    );
}

// 학생 인증 상태 창고(StudentAuthContext.provider)사용하기위해 필요한 열쇠 역할.
export function useStudentAuth() {
    const ctx = useContext(StudentAuthContext);
    if (!ctx) {
        throw new Error("useStudentAuth must be used within StudentAuthProvider");
    }
    return ctx;
}
