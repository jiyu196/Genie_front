"use client";

import { useState } from "react";

type StoryResultProps = {
    characterWords: string[];
    stories: { words: string[] }[];
    onRegenerate: (cutIndex: number) => Promise<any>;
};

export default function StoryResult({
                                        characterWords,
                                        stories,
                                        onRegenerate,
                                    }: StoryResultProps) {

    const MAX_REGENERATE = 3;
    const [cutAttempts, setCutAttempts] = useState<number[]>([]);

    const handleRegenerate = async (cutIndex: number) => {
        // 컷별 재생성 제한
        if ((cutAttempts[cutIndex] ?? 0) >= MAX_REGENERATE) return;

        // 횟수 증가
        setCutAttempts(prev => {
            const next = [...prev];
            next[cutIndex] = (next[cutIndex] ?? 0) + 1;
            return next;
        });

        // 실제 재생성 (부모에서 내려온 함수 사용)
        const response = await onRegenerate(cutIndex);

        const imageUrl = response.data.generateStory.imageUrl;

        // 컷의 이미지 교체
        console.log("새 이미지 URL:", imageUrl);
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] px-6 py-10">
            <h1 className="text-2xl font-bold text-center mb-8">
                🎉 우리가 만든 이야기
            </h1>

            {/* 캐릭터 */}
            <section className="mb-10">
                <h2 className="text-lg font-semibold mb-2">🧚‍♀️ 주인공</h2>
                <div className="flex gap-2 flex-wrap">
                    {characterWords.map((word, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-white rounded-full text-sm shadow"
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </section>

            {/* 컷 리스트 */}
            <section className="space-y-10">
                {stories.map((story, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-5 shadow"
                    >
                        <h3 className="font-semibold mb-3">
                            📖 {index + 1}번째 장면
                        </h3>

                        <div className="flex gap-2 flex-wrap mb-4">
                            {story.words.map((word, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                >
                                    {word}
                                </span>
                            ))}
                        </div>

                        {/* 재생성 버튼 */}
                        <button
                            onClick={() => handleRegenerate(index)}
                            disabled={(cutAttempts[index] ?? 0) >= MAX_REGENERATE}
                            className="
                                px-4 py-2
                                rounded-lg
                                text-sm font-semibold
                                bg-pink-100 text-pink-600
                                disabled:opacity-40
                            "
                        >
                            🎨 다시 그리기 ({cutAttempts[index] ?? 0}/{MAX_REGENERATE})
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}
