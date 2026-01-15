"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/b2b/Button";
import { GET_MY_SERVICE_ID } from "@/graphql/b2b/plan/getMyServiceId";
import {Copy} from "lucide-react";
import WebtoonSummaryModal from "@/components/b2b/mypage/WebtoonSummaryModal";

// 서비스 계정 타입 (학생 계정으로 사용)
type ServiceAccount = {
    serviceAccessId: number;  // (URL / 조회용)
    decryptedKey: string; // 사용자 노출 / 복사용
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

    const [selectedServiceAccountId, setSelectedServiceAccountId] =
        useState<string | null>(null);



    // 서비스 계정 조회
    const { data, loading } = useQuery(GET_MY_SERVICE_ID, {
        variables: {
            input: {
                page,
                size,
            },
        },
        fetchPolicy: "no-cache",
    });
    console.log(data);

    const[serviceAccessId, setServiceAccessId] = useState<number>(0);

    // 전체 계정 복사(현재페이지 10개씩 복사가능)
    const copyAllAccounts = async () => {
        const allKeys = accounts.map(a => a.decryptedKey).join("\n");
        await navigator.clipboard.writeText(allKeys);
        alert("현재 페이지 계정이 복사되었습니다.");
    };

    // 단일 계정 복사
    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        alert("계정이 복사되었습니다.");
    };

    const accounts: ServiceAccount[] =
        data?.getMyAccessIdPage?.content ?? [];

    const pageInfo = data?.getMyAccessIdPage;
    // 미 구독시 접근제한
    const isLoading = loading;
    const totalCount = pageInfo?.totalElements ?? 0;
    const hasServiceAccounts = totalCount > 0;

    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
            {/* 페이지 헤더 */}
            <div className="flex items-start justify-between gap-6 pr-15">
                <div>
                    <h1 className="text-2xl font-bold text-[#19344e]">
                        발급된 학생 계정
                    </h1>
                    <p className="text-sm text-[#19344e]/60 mt-3">
                        구독 완료 후 자동 발급된 학생 계정입니다.
                        해당 계정으로 Genie튠 서비스를 이용할 수 있습니다.
                    </p>
                </div>

                {/* 구독 + 계정 있을때만 */}
                {!isLoading && hasServiceAccounts && (
                    <Link href="/student">
                        <Button variant="primary">
                            지니튠 서비스로 이동
                        </Button>
                    </Link>
                )}
            </div>

            {/* 학생 리스트 카드 */}
            {!isLoading && hasServiceAccounts && (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* 카드 헤더 */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h2 className="font-semibold text-[#19344e]">
                            학생 계정 목록
                        </h2>
                        <span className="text-sm px-3 py-1 rounded-full bg-[#F4F6FF] text-[#19344e] font-medium">
                            총 {pageInfo?.totalElements ?? 0}개의 학생 계정이 발급되었습니다.
                        </span>
                        <button
                            type="button"
                            onClick={copyAllAccounts}
                            className="
                                flex items-center gap-1.5
                                px-3 py-1
                                text-xs
                                rounded-md
                                border border-gray-200
                                text-gray-600
                                hover:bg-gray-50
                                hover:text-gray-700
                                transition
                                cursor-pointer
                            "
                        >
                            <Copy size={14} />
                            현재 페이지 계정 복사
                        </button>
                    </div>

                    {/* 테이블 */}
                    <table className="w-full text-sm">
                        <thead className="bg-[#F4F6FF] text-[#19344e]/70">
                        <tr>
                            <th className="text-left px-6 py-3">번호</th>
                            <th className="text-left px-6 py-3">아이디</th>
                            <th className="text-left px-6 py-3">상태</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={3} className="px-6 py-6 text-center text-gray-400">
                                    불러오는 중...
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            accounts.map((account, index) => {
                                const rowNumber = (page - 1) * size + index + 1;

                                return (
                                    <tr key={account.serviceAccessId} className="border-b hover:bg-gray-50 cursor-pointer"
                                        onClick={() => {
                                            console.log(account.decryptedKey);
                                            setSelectedServiceAccountId(account.decryptedKey)
                                            console.log(account.serviceAccessId)
                                            setServiceAccessId(account.serviceAccessId)
                                        }
                                    }
                                    >
                                        <td className="px-6 py-4 text-gray-500">{rowNumber}</td>
                                        <td className="px-6 py-4 font-mono text-gray-700">
                                            <div className="flex items-center gap-2 max-w-[360px]">
                                                {/* 화면 표시용 (잘려 보이게) */}
                                                <span className="truncate">
                                                    {account.decryptedKey}
                                                </span>

                                                {/* 복사 버튼 */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();  // 이벤트 분리(복사는 복사만, 계정클릭 이벤트는 따로)
                                                        copyToClipboard(account.decryptedKey)
                                                    }}
                                                    className="text-gray-400 hover:text-[#19344e] transition cursor-pointer"
                                                    title="계정 복사"
                                                >
                                                    <Copy size={14} />
                                                </button>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {renderStatus(account.accessStatus)}
                                        </td>
                                    </tr>
                                );
                            })}
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
            )}
            {/* 모달 렌더링 영역 */}
            {selectedServiceAccountId !== null && (
                <WebtoonSummaryModal
                    serviceAccessId={serviceAccessId}
                    decryptedKey={selectedServiceAccountId}
                    onClose={() => setSelectedServiceAccountId(null)}
                />
            )}

        </section>

    );
}
