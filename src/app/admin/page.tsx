"use client";

import DashboardCard from "@/components/admin/DashboardCard";
import {useAdminDashboard} from "@/hook/admin/useAdminDashboard";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import SignupApprovalChart from "@/components/admin/SignupApprovalChart";
import {useQuery} from "@apollo/client";
import {GET_ALL_SALES} from "@/graphql/admin/getAdminSales";

type Sale = {
    amount: number;
};


export default function AdminDashboardPage() {
    const router = useRouter();
    const {
        loading,
        pendingCount,
        approvedCount,
        rejectedCount,
        recentPending,
    } = useAdminDashboard();

    // 날짜
    const now = new Date();

    const startOfThisMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0
    )
        .toISOString()
        .slice(0, 19); // ⬅️ 핵심 (Z 제거)

    const endOfThisMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
    )
        .toISOString()
        .slice(0, 19);


    // 총 매출
    const { data } = useQuery(GET_ALL_SALES, {
        variables: {
            input: {
                page: 1,
                size: 1000, // 충분히 크게
                salesSearchCondition: {
                    payStatus: "PAID",
                    from: startOfThisMonth,
                    to: endOfThisMonth,
                },
            },
        },
    });

    // 합계
    const thisMonthSales =
        data?.getAllSales?.content.reduce(
            (sum: number, sale: Sale) => sum + sale.amount,
            0
        ) ?? 0;

    if (loading) {
        return <div className="p-6 text-sm text-gray-400">로딩 중...</div>;
    }

    return (
        <div className="space-y-6 pl-3 pr-2 pb-4">
            {/* 타이틀 */}
            <div>
                <h1 className="text-xl font-semibold text-[#19344e] pt-4">
                    관리자 대시보드
                </h1>
                <p className="text-sm text-[#19344e]">
                    서비스 운영 현황 요약
                </p>
            </div>

            {/* KPI */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DashboardCard
                    title="승인 대기 기관"
                    value={String(pendingCount)}
                    highlight
                    onClick={() => router.push("/admin/members?registerStatus=PENDING")}
                />
                <DashboardCard
                    title="승인 완료 기관"
                    value={String(approvedCount)}
                    onClick={() => router.push("/admin/members?registerStatus=APPROVED")}
                />
                <DashboardCard
                    title="반려 기관"
                    value={String(rejectedCount)}
                    onClick={() => router.push("/admin/members?registerStatus=REJECTED")}
                />
                <DashboardCard
                    title="이번 달 매출"
                    value={`₩${thisMonthSales.toLocaleString()}`}
                />

            </section>

            {/* 그래프 자리 */}
            <section className="bg-white border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-[#19344e] mb-4">
                    가입 / 승인 추이
                </h2>
                <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">
                    <SignupApprovalChart members={recentPending}/>
                </div>
            </section>

            {/* 최근 승인 요청 */}
            <section className="bg-white border border-gray-200">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-sm font-semibold text-[#19344e]">
                        최근 승인 요청
                    </h2>
                    <button
                        className="text-xs text-[#fb991c] font-bold cursor-pointer"
                        onClick={() => router.push("/admin/members?registerStatus=PENDING")}
                    >
                        전체 보기 →
                    </button>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]">
                    <tr>
                        <th className="px-4 py-3 text-left">기관명</th>
                        <th className="px-4 py-3 text-left">이메일</th>
                        <th className="px-4 py-3 text-left">요청일</th>
                        <th className="px-4 py-3 text-left">상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentPending.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                                승인 대기 요청이 없습니다.
                            </td>
                        </tr>
                    )}

                    {recentPending.map((m) => (
                        <tr
                            key={m.email}
                            className="border-t cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                                router.push(`/admin/members?email=${m.email}`)
                            }
                        >
                            <td className="px-4 py-3">{m.organizationName}</td>
                            <td className="px-4 py-3">{m.email}</td>
                            <td className="px-4 py-3">
                                {new Date(m.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-center">
                                    <StatusBadge status="PENDING"/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
