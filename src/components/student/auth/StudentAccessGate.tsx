"use client";

import { useRouter } from "next/navigation";
import { useStudentAuth} from "@/contexts/student/StudentAuthContext";

// 로그인 안한 사용자는 word, sentence 접근 불가-> 로그인 페이지로 이동
export default function StudentAccessGate({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const auth  = useStudentAuth();
    const router = useRouter();

    if (!auth.initialized) return null;

    if (!auth.isLoggedIn) {
        router.replace("/student/login");
        return null;
    }

    if (
        auth.memberStatus !== "APPROVED" ||
        auth.subscriptionStatus !== "ACTIVE" ||
        !auth.hasServiceAccess
    ) {
        router.replace("/student/access-denied");
        return null;
    }

    return <>{children}</>;
}
