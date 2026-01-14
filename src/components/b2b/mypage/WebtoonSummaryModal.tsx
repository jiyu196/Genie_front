"use client";

import { useQuery } from "@apollo/client";
import Button from "@/components/b2b/Button";
import { useRouter } from "next/navigation";
import { GET_MY_WEBTOON_FOR_MY_PAGE } from "@/graphql/b2b/member/mypage/getMyWeebtoonForMypage";
import { WebtoonGroup } from "@/types/student/webtoon";
import { useState } from "react";

interface Props {
    decryptedKey: string;
    onClose: () => void;
}

export default function WebtoonSummaryModal({ decryptedKey, onClose }: Props) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const size = 5;
    

    const { data, loading } = useQuery(GET_MY_WEBTOON_FOR_MY_PAGE, {
        variables: {
            input: {
                page,
                size,
                decryptedKey,
            },
        },
        fetchPolicy: "no-cache",
    });

    const pageInfo = data?.getWebtoonForMyPage;
    const webtoons: WebtoonGroup[] = pageInfo?.content ?? [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl w-[720px] p-6 flex flex-col max-h-[80vh]">

                {/* 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">학생 생성 결과 요약</h2>
                    <button onClick={onClose} className="text-xl">✕</button>
                </div>

                {/* 리스트 영역 */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {loading && (
                        <p className="text-gray-400 text-sm text-center py-10">
                            불러오는 중...
                        </p>
                    )}

                    {!loading && webtoons.length === 0 && (
                        <p className="text-gray-400 text-sm text-center py-10">
                            생성된 결과물이 없습니다.
                        </p>
                    )}

                    {webtoons.map(group => (
                        <div
                            key={group.webtoonGroupId}
                            className="flex items-center gap-4 border rounded-lg p-3 bg-white"
                        >
                            <img
                                src={group.cuts[0]?.imageUrl}
                                className="w-16 h-20 object-cover rounded-md bg-gray-100"
                                alt="웹툰 썸네일"
                            />

                            <div className="flex-1">
                                <div className="font-medium text-sm">
                                    {group.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    컷 수 {group.cuts.length} · 생성일 기준
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이지네이션 */}
                {pageInfo && pageInfo.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 py-4 text-sm">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pageInfo.isFirst}
                            onClick={() => setPage(p => p - 1)}
                        >
                            이전
                        </Button>

                        <span className="text-gray-600">
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

                {/* 메인 CTA */}
                <div className="flex justify-end pt-4 border-t mt-2">
                    <Button
                        variant="primary"
                        onClick={() => {
                            router.push(`/b2b/mypage/serviceId/${decryptedKey}`);
                            onClose();
                        }}
                    >
                        학생 전체 결과 관리로 이동
                    </Button>
                </div>
            </div>
        </div>
    );
}
