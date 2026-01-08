"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/b2b/Button";
import { GET_MY_SERVICE_ID } from "@/graphql/b2b/plan/getMyServiceId";

// 서비스 계정 타입 (학생 계정으로 사용)
type ServiceAccount = {
    decryptedKey: string;
    accessStatus: "ACTIVE" | "EXPIRED";
    createdAt: string;
    expiredAt: string;
};

// 상태 뱃지 렌더링
function renderStatus(status: "ACTIVE" | "EXPIRED") {
    if (status === "ACTIVE") {
        return (
            <span className="inline-flex items-center gap-2 text-green-600 font-medium">
        ● 활성
      </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-2 text-gray-400 font-medium">
        ● 만료
    </span>
    );
}

export default function StudentsPage() {
    // 페이지네이션 상태
    const [page, setPage] = useState(1);
    const size = 10;

    // 서비스 계정 조회
    const { data, loading } = useQuery(GET_MY_SERVICE_ID, {
        variables: {
            input: {
                page,
                size,
            },
        },
    });

    const accounts: ServiceAccount[] =
        data?.getMyAccessIdPage?.content ?? [];

    const pageInfo = data?.getMyAccessIdPage;

    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
            {/* 페이지 헤더 */}
            <div>
                <h1 className="text-2xl font-bold text-[#19344e]">
                    학생 관리
                </h1>
                <p className="text-sm text-[#19344e]/60 mt-1">
                    발급된 Genie툰 학생 계정을 확인하고 관리할 수 있습니다.
                </p>
            </div>

            {/* 학생 리스트 카드 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* 카드 헤더 */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="font-semibold text-[#19344e]">
                        학생 계정 목록
                    </h2>

                    {/* 학생 계정이 있을 때만 서비스 이동 가능 */}
                    {accounts.length > 0 && (
                        <Link href="/student">
                            <Button className="px-4 py-2 hover:brightness-90">
                                지니튠 서비스로 이동
                            </Button>
                        </Link>
                    )}
                </div>

                {/* 테이블 */}
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]/70">
                    <tr>
                        <th className="text-left px-6 py-3 font-medium">
                            이름
                        </th>
                        <th className="text-left px-6 py-3 font-medium">
                            아이디
                        </th>
                        <th className="text-left px-6 py-3 font-medium">
                            상태
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* 로딩 */}
                    {loading && (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-6 py-6 text-center text-gray-400"
                            >
                                불러오는 중...
                            </td>
                        </tr>
                    )}

                    {/* 데이터 있음 */}
                    {!loading && accounts.length > 0 &&
                        accounts.map(account => (
                            <tr
                                key={account.decryptedKey}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                {/* 앞에 번호로 바꿀예정 */}
                                <td className="px-6 py-4 text-gray-500">
                                    -
                                </td>

                                {/* 아이디 */}
                                <td className="px-6 py-4 font-mono text-gray-700">
                                    {account.decryptedKey}
                                </td>

                                {/* 상태 */}
                                <td className="px-6 py-4">
                                    {renderStatus(account.accessStatus)}
                                </td>
                            </tr>
                        ))}

                    {/* 데이터 없음 */}
                    {!loading && accounts.length === 0 && (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-6 py-6 text-center text-gray-400"
                            >
                                발급된 학생 계정이 없습니다.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* 페이지네이션 */}
                {pageInfo && (
                    <div className="flex justify-center items-center gap-3 py-4">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pageInfo.isFirst}
                            onClick={() => setPage(p => p - 1)}
                        >
                            이전
                        </Button>

                        <span className="text-sm">
              {pageInfo.currentPage} / {pageInfo.totalPages}
            </span>

                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pageInfo.isLast}
                            onClick={() => setPage(p => p + 1)}
                        >
                            다음
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
