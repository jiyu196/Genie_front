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

    const { isLoggedIn, initialized } = useSelector(
        (state: RootState) => state.studentAuth
    );

    useEffect(() => {
        if (!initialized) return;

        if (!isLoggedIn) {
            router.replace("/student/login");
        }
    }, [initialized, isLoggedIn]);

    if (!initialized) return null;
    if (!isLoggedIn) return null;

    return <>{children}</>;

}
