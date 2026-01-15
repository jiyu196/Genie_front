"use client";

import { useQuery } from "@apollo/client";
import Button from "@/components/b2b/Button";
import { useRouter } from "next/navigation";
import { GET_MY_WEBTOON_FOR_MY_PAGE } from "@/graphql/b2b/member/mypage/getMyWeebtoonForMypage";
import { WebtoonGroup } from "@/types/student/webtoon";
import { useState } from "react";
import {sortWebtoonCutsInStoryOrder} from "@/utils/sortWebtoonCuts";
import {downloadByLink} from "@/utils/downLoad";

interface Props {
    serviceAccessId: number
    decryptedKey: string;
    onClose: () => void;
}

export default function WebtoonSummaryModal({serviceAccessId, decryptedKey, onClose }: Props) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const size = 5;

    const [selectedGroup, setSelectedGroup] = useState<WebtoonGroup | null>(null);

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
            <div className="bg-white rounded-2xl w-[900px] p-6 flex flex-col max-h-[85vh]">

                {/* 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-bold text-lg">학생 생성 결과</h2>
                        <p className="text-xs text-gray-500 mt-1">
                            해당 학생 계정으로 생성된 웹툰 결과입니다.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-xl cursor-pointer">✕</button>
                </div>

                {/* 본문 */}
                <div className="flex flex-1 gap-4 overflow-hidden border rounded-xl">

                    {/* 왼쪽: 웹툰 목록 */}
                    <div className="w-[260px] border-r overflow-y-auto p-3 space-y-2">
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
                            <button
                                key={group.webtoonGroupId}
                                onClick={() => setSelectedGroup(group)}
                                className={`
                                    w-full text-left rounded-lg border p-2 transition cursor-pointer
                                    ${selectedGroup?.webtoonGroupId === group.webtoonGroupId
                                                        ? "bg-[#F4F6FF] border-[#19344e]"
                                                        : "hover:bg-gray-50"}
                                  `}
                            >
                                <img
                                    src={group.cuts[0]?.imageUrl}
                                    className="w-full h-28 object-cover rounded-md bg-gray-100"
                                    alt="웹툰 썸네일"
                                />
                                <div className="mt-2 text-sm font-medium truncate">
                                    {group.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    컷 {group.cuts.length}개
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* 오른쪽: 컷 미리보기 */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {!selectedGroup && (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                왼쪽에서 웹툰을 선택해주세요
                            </div>
                        )}

                        {selectedGroup && (
                            <>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#19344e]">
                                        {selectedGroup.title}
                                    </h3>
                                    <span className="text-xs text-gray-500">
                                      컷 {selectedGroup.cuts.length}개 · 클릭 시 다운로드
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {sortWebtoonCutsInStoryOrder(selectedGroup.cuts).map((cut, idx) => (
                                        <div
                                            key={idx}
                                            className="
                                              relative
                                              cursor-pointer
                                              rounded-xl
                                              overflow-hidden
                                              group
                                              border
                                              bg-white
                                            "
                                            onClick={() => downloadByLink(cut.imageUrl)}
                                        >
                                            <img
                                                src={cut.imageUrl}
                                                className="w-full h-full object-cover"
                                                alt={`컷 ${idx + 1}`}
                                            />

                                            {/* hover 다운로드 */}
                                            <div
                                                className="
                                                    absolute inset-0
                                                    bg-black/40
                                                    opacity-0
                                                    group-hover:opacity-100
                                                    transition
                                                    flex flex-col items-center justify-center
                                                    text-white
                                                    text-sm
                                                    font-medium
                                                  "
                                            >
                                                <div>컷 {idx + 1}</div>
                                                <div className="text-xs mt-1">클릭하여 다운로드</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* 페이지네이션 */}
                {pageInfo && pageInfo.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-4 text-sm">
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
            </div>
        </div>
    );
}
