"use client";

import ApprovedHeader from "@/components/b2b/mypage/ApprovalHeader";
import { User } from "@/store/slice/authSlice";

type Props = {
    member: User;
};

export default function OrganizationClient({ member }: Props) {
    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">

            {/* 승인 상태 */}
            <ApprovedHeader />

            {/* 기관 정보 */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb]">
                <div className="px-8 py-6 border-b">
                    <h2 className="text-base font-semibold text-[#19344e]">
                        기관 정보
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        가입 시 등록한 기관 및 담당자 정보입니다.
                    </p>
                </div>

                <div className="px-8 py-6 grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
                    <InfoRow label="기관명" value={member.organizationName} />
                    <InfoRow label="사업자등록번호" value={member.bizNumber} />

                    <InfoRow label="담당자명" value={member.contactName} />
                    <InfoRow label="담당자 이메일" value={member.email} />

                    <InfoRow label="대표자명" value={member.representativeName} />
                </div>
            </div>

            {/* 다음 단계 (선택) */}
            <div className="bg-[#F9FAFB] border border-dashed border-gray-300 rounded-xl px-6 py-5">
                <p className="text-sm text-gray-700">
                    이제 <b>학생 계정 등록</b> 또는 <b>구독 플랜 설정</b>을 진행해보세요.
                </p>
            </div>
        </section>
    );
}

/* 내부 컴포넌트 */
function InfoRow({
                     label,
                     value,
                 }: {
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1">
            <p className="text-gray-500">{label}</p>
            <p className="font-medium text-[#19344e]">{value}</p>
        </div>
    );
}
