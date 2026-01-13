"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function StudentAccessGate({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const { initialized, isLoggedIn } = useSelector(
        (state: RootState) => state.studentAuth
    );

    useEffect(() => {
        if (!initialized) return;

        // 로그인 안 됐으면 로그인 페이지로
        if (!isLoggedIn) {
            router.replace("/student/login");
        }
    }, [initialized, isLoggedIn, router]);

    if (!initialized) return null;
    if (!isLoggedIn) return null;

    return <>{children}</>;
}
