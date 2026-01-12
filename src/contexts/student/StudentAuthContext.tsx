"use client";

import {createContext, useContext, useEffect, useState} from "react";

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
    const [hasServiceAccess, setHasServiceAccess] = useState(false);

    // 새로고침 시 로그인 풀림
    const [initialized, setInitialized] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
        setHasServiceAccess(true); // 로그인 성공 시 학습 가능
    };

    const logout = () => {
        setIsLoggedIn(false);
        setHasServiceAccess(false);
    };

    useEffect(() => {
        async function initAuth() {
            try {
                // 서버에 "나 로그인 돼있어?" 확인
                await fetch("/api/student/me", {
                    credentials: "include",
                });

                setIsLoggedIn(true);
                setHasServiceAccess(true);
            } catch {
                setIsLoggedIn(false);
                setHasServiceAccess(false);
            } finally {
                setInitialized(true);
            }
        }

        initAuth();
    }, []);

    return (
        <StudentAuthContext.Provider
            value={{
                // 기본
                isLoggedIn,
                initialized,

                // 학습 권한
                memberStatus: "PENDING",
                subscriptionStatus: "NONE",
                hasServiceAccess,

                login,
                logout,
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
