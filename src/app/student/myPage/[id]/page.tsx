"use client";

import { useParams } from "next/navigation";
import StudentButton from "@/components/student/StudentButton";
import {GET_MY_WEBTOON} from "@/graphql/student/story/getWebtoonPage";
import {useQuery} from "@apollo/client";
import {useWebtoonDownload} from "@/hook/student/useWebtoonDownload";

type WebtoonCut = {
    imageUrl: string;
};

type WebtoonGroup = {
    webtoonGroupId: string;
    title: string;
    cuts: WebtoonCut[];
};

export default function MyWorkDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useQuery(GET_MY_WEBTOON, {
        variables: {
            input: {
                page: 1,
                size: 20,
            },
        },
        fetchPolicy: "no-cache",
    });
    // 네컷 다운로드
    const {downloadCombinedImage} = useWebtoonDownload();

    if (loading) return <div className="text-center py-20">불러오는 중...</div>;
    if (error) return <div className="text-center py-20">에러 발생 😢</div>;

    const works: WebtoonGroup[] =
        data?.getWebtoonPage?.content ?? [];

    const work = works.find(w => w.webtoonGroupId === id);

    if (!work) {
        return (
            <div className="text-center py-20 text-gray-500">
                해당 이야기를 찾을 수 없어요 🥲
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-[#e6f2ff] via-[#fde7f3] to-[#fff3df]">
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="bg-white rounded-3xl p-5 shadow space-y-4">
                    {/* 타이틀 */}
                    <h2 className="text-2xl font-extrabold text-center">
                        📖 내가 만든 문장 📖
                    </h2>
                    {/* 문장 */}
                    <div
                        className="
                            rounded-2xl
                            text-sm
                            font-semibold
                            text-[#3b2d2d]
                            text-center
                            leading-relaxed
                        "
                    >
                        {work.title}
                    </div>
                </div>

                {/* 4컷 */}
                <div className="grid grid-cols-2 gap-4">
                    {work.cuts.map((cut, idx) => (
                        <div
                            key={idx}
                            className="aspect-square rounded-2xl overflow-hidden bg-white shadow"
                        >
                            <img
                                src={cut.imageUrl}
                                alt={`컷 ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* 다운로드 */}
                <div className="flex justify-center">
                    <StudentButton
                        className="px-6 py-3"
                        onClick={() =>
                        downloadCombinedImage(
                           work.cuts.map(c => c.imageUrl),
                           `${work.webtoonGroupId}.png`
                        )
                    }
                >
                        이미지 다운로드 하기
                    </StudentButton>
                </div>
            </div>
        </div>
    );
}