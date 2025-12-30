// app/b2b/mypage/organization/page.tsx
"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import OrganizationClient from "@/components/b2b/mypage/OrganizationClient";

export default function OrganizationPage() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) return null;

    if (user.registerStatus === "PENDING") {
        router.replace("/b2b/pending");
        return null;
    }

    if (user.registerStatus === "REJECTED") {
        router.replace("/b2b/rejected");
        return null;
    }

    return <OrganizationClient member={user} />;
}
