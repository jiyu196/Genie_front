"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const { loading, isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    const RESTRICTED_PATHS = [
        "/b2b/mypage",
    ];

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        const isRestricted = RESTRICTED_PATHS.some((path) =>
            pathname.startsWith(path)
        );

        if (!isRestricted) return;

        if (user.registerStatus === "PENDING") {
            router.replace("/b2b/pending");
            return;
        }

        if (user.registerStatus === "REJECTED") {
            router.replace("/b2b/rejected");
            return;
        }

        // APPROVED는 통과
    }, [isAuthenticated, user, pathname, router]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return <>{children}</>;
}
