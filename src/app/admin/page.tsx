// app/admin/page.tsx
import DashboardCard from "@/components/admin/DashboardCard";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6 pl-3 pr-2 pb-4">
            {/* 페이지 타이틀 */}
            <div>
                <h1 className="text-xl font-semibold text-[#19344e] pt-4">
                    관리자 대시보드
                </h1>
                <p className="text-sm text-[#19344e]">
                    서비스 운영 현황 요약
                </p>
            </div>

            {/* KPI 카드 */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DashboardCard title="승인 대기 기관" value="12" highlight />
                <DashboardCard title="활성 기관 수" value="38" />
                <DashboardCard title="이번 달 매출" value="₩4,200,000" />
                <DashboardCard title="금칙어 탐지" value="7" />
            </section>

            {/* 중간 영역 (그래프 자리) */}
            <section className="bg-white border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-[#19344e] mb-4">
                    가입 / 승인 추이
                </h2>
                <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">
                    그래프 영역 (추후 Chart 연동)
                </div>
            </section>

            {/* 승인 대기 리스트 */}
            <section className="bg-white border border-gray-200">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-sm font-semibold text-[#19344e]">
                        최근 승인 요청
                    </h2>
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
                    <tr className="border-t">
                        <td className="px-4 py-3">서울초등학교</td>
                        <td className="px-4 py-3">admin@school.ac.kr</td>
                        <td className="px-4 py-3">2025-12-17</td>
                        <td className="px-4 py-3">
                <span className="text-[#fb991c] font-medium">
                  승인 대기
                </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}




