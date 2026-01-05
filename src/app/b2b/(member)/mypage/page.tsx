"use client";

import { useQuery } from "@apollo/client";
import { ME_QUERY} from "@/graphql/auth/me";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export default function MyPageHome() {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) return null; // 사실상 여기까지 올 일 없음

    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
            {/* 타이틀 */}
            <div>
                <h1 className="text-2xl font-semibold text-[#19344e]">
                    {user.organizationName} 관리자 페이지
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    기관 계정의 기본 정보와 이용 상태를 확인할 수 있습니다.
                </p>
            </div>

            {/* 핵심 요약 (박스 1개만) */}
            <div className="rounded-xl border bg-white px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Summary label="계정 상태" value="정상 이용 중" accent />
                    <Summary label="승인 상태" value={user.registerStatus} />
                    <Summary label="담당자" value={user.contactName} />
                </div>
            </div>

            {/* 안내 문구 (박스 X) */}
            <div className="space-y-2">
                <p className="text-xl font-bold text-[#19344e]">
                    * 이용 안내
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                    좌측 메뉴를 통해 기관 정보 수정, 비밀번호 변경, 학생 관리,
                    구독 및 결제 정보를 확인할 수 있습니다.
                </p>
            </div>

            {/* 바로가기 (박스 말고 리스트 느낌) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md font-bold">
                <QuickText title="기관 정보 관리" />
                <QuickText title="비밀번호 변경" />
                <QuickText title="학생 계정 관리" />
                <QuickText title="구독 & 결제 관리" />
            </div>
        </section>
    );
}

    function Summary({
                         label,
                         value,
                         accent,
                     }: {
        label: string;
        value: string;
        accent?: boolean;
    }) {
        return (
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p
                    className={`text-lg font-semibold ${
                        accent ? "text-green-600" : "text-[#19344e]"
                    }`}
                >
                    {value}
                </p>
            </div>
        );
    }

    function QuickText({ title }: { title: string }) {
        // 바로가기 텍스트
        return (
            <div className="text-[#19344e] hover:underline cursor-pointer">
                {title}
            </div>
        );
    }
