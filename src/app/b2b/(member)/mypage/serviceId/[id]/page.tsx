"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { downloadByLink } from "@/utils/downLoad";
import { GET_MY_WEBTOON_FOR_MY_PAGE } from "@/graphql/b2b/member/mypage/getMyWeebtoonForMypage";
import { WebtoonGroup } from "@/types/student/webtoon";
import Button from "@/components/b2b/Button";
import {sortWebtoonCutsInStoryOrder} from "@/utils/sortWebtoonCuts";

export default function StudentWebtoonDetailPage() {
    const { id } = useParams<{ id: string }>(); // decryptedKey

    const { data, loading } = useQuery(GET_MY_WEBTOON_FOR_MY_PAGE, {
        variables: {
            input: {
                page: 1,
                size: 50,
                decryptedKey: id,
            },
        },
        fetchPolicy: "no-cache",
    });

    const webtoons: WebtoonGroup[] =
        data?.getWebtoonForMyPage?.content ?? [];

    if (loading) {
        return (
            <div className="p-20 text-center text-gray-400">
                학생 생성 결과를 불러오는 중입니다.
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-8 py-10 space-y-12">

            {/* 상단 요약 영역 */}
            <div className="bg-white rounded-xl border p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-[#19344e]">
                        학생 생성 결과물
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        학생 계정 ID: <span className="font-mono">{id}</span>
                    </p>
                </div>

                <div className="text-sm text-gray-600">
                    총 생성 묶음: <b>{webtoons.length}</b>건
                </div>
            </div>

            {/* 결과 없음 */}
            {webtoons.length === 0 && (
                <div className="text-center text-gray-400 py-20">
                    생성된 결과물이 없습니다.
                </div>
            )}

            {/* 결과 목록 */}
            {webtoons.map(group => {
                const sortedCuts = sortWebtoonCutsInStoryOrder(group.cuts);

                return (
                    <div key={group.webtoonGroupId} className="space-y-4">
                        {/* 그룹 헤더 */}
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-[#19344e]">
                                {group.title}
                            </h2>
                            <span className="text-sm text-gray-500">
                        컷 수 {sortedCuts.length}
                    </span>
                        </div>

                        {/* 컷 그리드 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sortedCuts.map((cut, idx) => (
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
                                    {/* 이미지 */}
                                    <img
                                        src={cut.imageUrl}
                                        className="w-full h-full object-cover"
                                        alt={`컷 ${idx + 1}`}
                                    />

                                    {/* hover 다운로드 오버레이 */}
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
                    </div>
                );
            })}
        </section>

    );
}
