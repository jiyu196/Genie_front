"use client";

import { useState } from "react";

export default function PromptsPage() {
    const [prompt, setPrompt] = useState(
        "아이들이 이해할 수 있는 쉬운 표현으로 답변하세요."
    );

    return (
        <div className="bg-white border border-gray-200 p-4 space-y-4 rounded-md">
            {/* 설명 */}
            <p className="text-xs text-gray-500 leading-relaxed">
                ※ 이 화면은 학생 AI 응답에 공통으로 적용되는 시스템 프롬프트를 관리하는 페이지입니다.<br />
                관리자는 이 문장을 통해 AI의 말투와 난이도를 아이 눈높이에 맞게 조절할 수 있습니다.
            </p>

            {/* 프롬프트 입력 */}
            <label className="block text-sm font-medium text-gray-700">
                시스템 프롬프트
            </label>

            <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-md p-3 text-sm"
            />

            {/* 미리보기 (더미) */}
            <div className="bg-[#F4F6FF] border border-gray-200 p-3 rounded text-sm">
                <p className="font-semibold text-[#19344e] mb-1">💬 AI 응답 예시</p>
                <p className="text-gray-700">
                    “친구야, 이건 이렇게 생각해볼 수 있어!”
                </p>
            </div>

            {/* 저장 */}
            <div className="flex justify-end">
                <button
                    onClick={() => alert("프롬프트 저장 (추후 DB 연동 예정)")}
                    className="px-4 py-2 border rounded-md text-sm"
                >
                    저장
                </button>
            </div>
        </div>

    );
}
