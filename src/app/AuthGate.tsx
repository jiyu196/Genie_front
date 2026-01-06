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
    // 비로그인 허용 경로
    const PUBLIC_AUTH_ROUTES = [
        "/b2b/findId",
        "/b2b/resetPassword",
    ];


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();

    // public route 여부 판단 (startsWith로 정확히)
    const isPublicRoute = PUBLIC_AUTH_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    // 리덕스 인증 상태
    const { loading, initialized, isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    // redirect 판단 완료 여부. children이 렌더 되는 것 방지
    const [checked, setChecked] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    // 경로 변경 시마다 다시 gate 잠금 (protected route만)
    useEffect(() => {
        if (!isPublicRoute) {
            setChecked(false);
        }
    }, [pathname, isPublicRoute]);

    // 최초 1회 인증 초기화. 쿠키에 로그인 세션이 있는지 1회 확인
    useEffect(() => {
        // 비로그인 전용 페이지에서는 인증 초기화(me 호출) 자체를 하지 않음
        if (isPublicRoute) {
            setChecked(true);
            return;
        }

        if (!initialized) {
            dispatch(initializeAuthThunk());
        }
    }, [initialized, dispatch, isPublicRoute]);

    useEffect(() => {
        // 비로그인 전용 페이지는 gate 즉시 통과
        if (isPublicRoute) {
            setChecked(true);
            return;
        }

        // 접근 제한 및 승인 상태 분기
        if (!initialized || loading) return;

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
            if (isAuthenticated) {
                setChecked(true); // 로그인 전 페이지 보이는 문제 -> 먼저 gate 통과 처리.
                if (user?.registerStatus === "PENDING") {
                    router.replace(AUTH_ROUTES.pending);
                    return;
                }
                if (user?.registerStatus === "REJECTED") {
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

        const isMypage =
           pathname.startsWith("/b2b/mypage");

        /* 마이페이지 접근 제어 */
        if (isMypage) {
            // 로그인 안 됐으면 로그인 페이지로 이동
            if (!isAuthenticated) {
                router.replace(AUTH_ROUTES.login);
                return;
            }

            // user 존재 보장 이후에만 접근
            if (!user || user.registerStatus !== "APPROVED") {
                if (user?.registerStatus === "PENDING") {
                    router.replace(AUTH_ROUTES.pending);
                    return;
                }

                if (user?.registerStatus === "REJECTED") {
                    router.replace(AUTH_ROUTES.rejected);
                    return;
                }
                // user가 null이면 안전하게 로그인으로
                router.replace(AUTH_ROUTES.login);
                return;
            }
        }

        // 그 외 페이지는 정상 통과
        setChecked(true);
    }, [
        initialized,
        loading,
        isAuthenticated,
        user,
        pathname,
        router,
        isPublicRoute,
    ]);

    // 판단 끝나지 않았을때에는 무조건 스피너
    if (!initialized || loading || !checked || redirecting) {
        return <LoadingSpinner />;
    }

    // public route-> checked 이후에만 렌더링
    if (isPublicRoute && checked) {
        return <>{children}</>;
    }


    // 모든 조건 통과 후에 실제 페이지 렌더. 나머지는 보호 페이지
    return <>{children}</>;
}
