"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { initializeAuthThunk } from "@/store/thunk/authThunk";

// 인증 초기화 끝날 때까지 children 렌더링 차단
// 승인 상태에 따라서 접근 제어
// 깜빡임( 로그인 전 페이지 노출) 방지
export default function AuthGate({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();

    // 리덕스 인증 상태
    const { loading, initialized, isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    // 최초 1회 인증 초기화. 쿠키에 로그인 세션이 있는지 1회 확인
    useEffect(() => {
        if (!initialized && !isAuthenticated) {
            dispatch(initializeAuthThunk());
        }
    }, [initialized, dispatch]);

    // redirect 판단 완료 여부. children이 렌더 되는 것 방지
    const [checked, setChecked] = useState(false);

    // 경로 변경 시마다 다시 gate 잠금
    useEffect(() => {
        setChecked(false);
    }, [pathname]);

    // 접근 제한 및 승인 상태 분기
    useEffect(() => {
        if (!initialized) return;

        const AUTH_ROUTES = {
            login: "/b2b/login",
            signup: "/b2b/signup",
            pending: "/b2b/pending",
            rejected: "/b2b/rejected",
            mypage: "/b2b",
        };

        /* 로그인 페이지 제어 */
        if (pathname === AUTH_ROUTES.login) {
            // 이미 로그인된 상태면 로그인 페이지 차단
            if (isAuthenticated && user) {
                if (user.registerStatus === "PENDING") {
                    router.replace(AUTH_ROUTES.pending);
                    return;
                }
                if (user.registerStatus === "REJECTED") {
                    router.replace(AUTH_ROUTES.rejected);
                    return;
                }
                router.replace(AUTH_ROUTES.mypage);
                return;
            }

            // 비로그인 상태면 로그인 페이지 허용
            setChecked(true);
            return;
        }

        const isMyPage =
            pathname === "/b2b" || pathname.startsWith("/b2b/mypage");

        /* 마이페이지 접근 제어 */
        if (isMyPage) {
            // 로그인 안 됐으면 로그인 페이지로 이동
            if (!isAuthenticated || !user) {
                router.replace(AUTH_ROUTES.login);
                return;
            }

            // user 존재 보장 이후에만 접근
            if (user.registerStatus === "PENDING") {
                router.replace(AUTH_ROUTES.pending);
                return;
            }

            if (user.registerStatus === "REJECTED") {
                router.replace(AUTH_ROUTES.rejected);
                return;
            }
        }

        // 그 외 페이지는 정상 통과
        setChecked(true);
    }, [initialized, isAuthenticated, user, pathname, router]);

    // 렌더링 완전히 차단
    // 인증 초기화 전, 인증 요청 중, 리다이렉트 판단 완료 전
    if (!initialized || loading || !checked) {
        return <LoadingSpinner />;
    }

    // 모든 조건 통과 후에 실제 페이지 렌더
    return <>{children}</>;
}
