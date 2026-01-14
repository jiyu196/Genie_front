"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function AdminGate({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { initialized, loading, isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (!initialized || loading) return;

        if (!isAuthenticated) {
            router.replace("/b2b/login");
            return;
        }

        if (user?.role !== "ADMIN") {
            router.replace("/");
            return;
        }

        setChecked(true);
    }, [initialized, loading, isAuthenticated, user, router]);

    if (!initialized || loading || !checked) {
        return null; // 또는 fullscreen spinner
    }

    return <>{children}</>;
}
