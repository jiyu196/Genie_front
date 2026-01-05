// app/b2b/mypage/organization/page.tsx
"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import OrganizationClient from "@/components/b2b/mypage/OrganizationClient";

export default function OrganizationPage() {
    const { user } = useSelector((state: RootState) => state.auth);

    // AuthGate를 통과했다면 user는 APPROVED
    if (!user) return null;

    return <OrganizationClient member={user} />;
}
