"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStudentAuth } from "@/contexts/student/StudentAuthContext";

export default function StudentAccessGate({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { initialized, isLoggedIn, hasServiceAccess } = useStudentAuth();

    useEffect(() => {
        if (!initialized) return;

        // 로그인 안 됐거나 서비스 접근권한 없으면 로그인으로
        if (!isLoggedIn || !hasServiceAccess) {
            router.replace("/student/login");
        }
    }, [initialized, isLoggedIn, hasServiceAccess, router]);

    if (!initialized) return null;
    if (!isLoggedIn || !hasServiceAccess) return null;

    return <>{children}</>;
}
