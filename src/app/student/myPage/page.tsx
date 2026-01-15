"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import StudentButton from "@/components/student/StudentButton";
import { GET_MY_WEBTOON} from "@/graphql/student/story/getWebtoonPage";
import {sortWebtoonCutsInStoryOrder} from "@/utils/sortWebtoonCuts";

type WebtoonCut = {
    imageUrl: string;
    createdAt: string;
};

type WebtoonGroup = {
    webtoonGroupId: string;
    title: string;
    cuts: WebtoonCut[];
};

export default function StudentMyPage() {
    const router = useRouter();

    const {data, loading, error} = useQuery(GET_MY_WEBTOON, {
        variables: {
            input: {
                page: 1,
                size: 6,
            },
        },
        fetchPolicy: "no-cache",
    });

    if (loading) {
        return <div className="text-center py-20">불러오는 중...</div>;
    }

    if (error) {
        return <div className="text-center py-20">에러 발생 😢</div>;
    }

    const works: WebtoonGroup[] =
        data?.getWebtoonPage?.content ?? [];

    return (
        <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-[#e6f2ff] via-[#fde7f3] to-[#fff3df]">
            <div className="max-w-7xl mx-auto mb-6">
                <span
                    onClick={() => router.push("/student")}
                    className="
                        inline-flex items-center gap-1
                        text-sm
                        text-[#7a5c5c]
                        hover:text-[#3b2d2d]
                        cursor-pointer
                        transition
                    "
                >
                    ← 내 학습방으로 돌아가기
                </span>
            </div>

            <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* 만들어진 이야기 없을 때 */}
                {works.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                        <p className="text-lg font-bold text-[#3b2d2d] mb-3">
                            아직 만들어진 이야기가 없어요 🌱
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            단어로 이야기를 만들어볼까요?
                        </p>
                        <StudentButton
                            className="px-6 py-3"
                            onClick={() => router.push("/student")}
                        >
                            이야기 만들러 가기
                        </StudentButton>
                    </div>
                )}
                {works.map((work) => {
                    // 이미지 순서 정렬
                    const sortedCuts = sortWebtoonCutsInStoryOrder(work.cuts)

                    return (
                        <div
                            key={work.webtoonGroupId}
                            onClick={() =>
                                router.push(`/student/mypage/${work.webtoonGroupId}`)
                            }
                            className="
                            cursor-pointer
                            bg-white
                            rounded-[36px]
                            px-8 py-8
                            flex flex-col
                            shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                        "
                        >
                            <h3 className="text-center text-lg font-extrabold text-[#3b2d2d] mb-5">
                                {work.title}
                            </h3>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {sortedCuts.map((cut, idx) => (
                                    <div
                                        key={idx}
                                        className="aspect-square rounded-[18px] overflow-hidden bg-[#f3f1f1]"
                                    >
                                        <img
                                            src={cut.imageUrl}
                                            alt={`컷 ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto flex justify-center">
                                <StudentButton className="px-4 py-2">
                                    크게 보기
                                </StudentButton>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};