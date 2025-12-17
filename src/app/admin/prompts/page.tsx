"use client";

import { useState } from "react";

export default function PromptsPage() {
    const [prompt, setPrompt] = useState(
        "아이들이 이해할 수 있는 쉬운 표현으로 답변하세요."
    );

    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-[#19344e]">프롬프트 관리</h1>

            <div className="bg-white border border-gray-200 p-4 space-y-4">
                <label className="block text-sm text-gray-600">
                    시스템 프롬프트
                </label>
                <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full border p-2 text-sm"
                />
                <button className="px-4 py-2 border text-sm">
                    저장
                </button>
            </div>
        </div>
    );
}
