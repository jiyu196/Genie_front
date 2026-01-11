"use client";

import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {CheckCircle2} from "lucide-react";
import SummaryRow from "@/components/b2b/mypage/SummaryRow";
import ActionLink from "@/components/b2b/mypage/ActionLink";

export default function MyPageHome() {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) return null; // 사실상 여기까지 올 일 없음

    return (
        <section className="max-w-[960px] ml-8 mt-10 space-y-12">

            {/* 헤더 */}
            <header className="space-y-1">
                <h1 className="text-3xl font-semibold text-[#19344e]">
                    {user.organizationName}
                </h1>
                <p className="text-sm text-gray-500">
                    기관 계정 관리 페이지
                </p>
            </header>

            {/* 승인 완료 + 상태 요약 박스 */}
            <div className="px-6 py-5 bg-white rounded-xl border border-[#e5e7eb] space-y-4">
                {/* 승인 안내 */}
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#19344e]">
                            관리자 승인 완료
                        </p>
                        <p className="text-sm text-gray-600">
                            Genie 서비스를 정상적으로 이용하실 수 있습니다.
                        </p>
                    </div>
                </div>

                {/* 상태 요약 */}
                <div className="pt-3 border-t border-[#f0f2f5] space-y-3 text-sm">
                    <SummaryRow label="계정 상태" value="정상 이용 중" accent />
                    <SummaryRow label="승인 상태" value={user.registerStatus} />
                    <SummaryRow label="담당자" value={user.contactName} />
                </div>
            </div>

            {/* 액션 영역 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ActionLink title="기관 정보 관리" href="/b2b/mypage/organization" />
                <ActionLink title="비밀번호 변경" href="/b2b/mypage/password" />
                <ActionLink title="학생 관리" href="/b2b/mypage/serviceId" />
                <ActionLink title="구독 & 결제 관리" href="/b2b/mypage/plan" />
            </div>
        </section>
    );
}
