import { redirect } from "next/navigation";
import { getCurrentMember } from "@/graphql/auth/member";
import OrganizationClient from "@/components/b2b/mypage/OrganizationClient";
import type { Member } from "@/types/admin/member";

export default async function OrganizationPage() {
    const member: Member = await getCurrentMember();

    if (
        member.registerStatus === "PENDING" ||
        member.registerStatus === "CANCELLED"
    ) {
        redirect("/b2b/pending");
    }

    return <OrganizationClient member={member} />;
}
