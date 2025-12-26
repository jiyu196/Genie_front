"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";

/**
 * AuthGate
 * - 앱 최초 진입 시 인증 상태 초기화가 끝날 때까지 대기
 * - 승인 전 사용자 접근 제한
 * - 전역 인증 가드 역할
 */
export default function AuthGate({
                                     children,
                                 }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const { loading, isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    // 승인 전 사용자 접근 제한 대상 경로
    const RESTRICTED_PATHS_FOR_PENDING = [
        "/b2b/mypage",
        "/b2b/organization",
        "/b2b/plan",
        "/b2b/settings",
        "/b2b/students",
    ];


    useEffect(() => {
        // 로그인은 되었으나 승인 전(PENDING)
        if (
            isAuthenticated &&
            user?.registerStatus !== "APPROVED"
        ) {
            const isRestricted = RESTRICTED_PATHS_FOR_PENDING.some(
                (path) => pathname.startsWith(path)
            );

            if (isRestricted) {
                router.replace("/b2b/pending");
            }
        }
    }, [isAuthenticated, user, pathname, router]);

    // 인증 초기화 중 → 전역 스피너
    if (loading) {
        return <LoadingSpinner />;
    }

    // 정상 접근
    return <>{children}</>;
}
