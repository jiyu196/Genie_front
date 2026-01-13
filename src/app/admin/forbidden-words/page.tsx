"use client";

import { useState } from "react";

type ForbiddenWord = {
    id: number;
    word: string;
    replacement: string;
};

export default function ForbiddenWordsPage() {
    const [words] = useState<ForbiddenWord[]>([
        { id: 1, word: "바보", replacement: "친구" },
        { id: 2, word: "멍청이", replacement: "조금 서툰 친구" },
    ]);

    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-[#19344e]">
                금칙어 관리
            </h1>
            <div className="bg-[#F4F6FF] border border-gray-200 p-3 rounded-md text-sm text-gray-700">
                아이들 학습 중 부적절한 단어가 입력되면,
                아래 대체 표현으로 자동 변환되어 AI 응답에 반영됩니다.
            </div>

            <div className="bg-white border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]">
                    <tr>
                        <th className="px-4 py-3 text-left">금칙어</th>
                        <th className="px-4 py-3 text-left">대체 표현</th>
                        <th className="px-4 py-3 text-center">관리</th>

                    </tr>
                    </thead>
                    <tbody>
                    {words.map(w => (
                        <tr key={w.id} className="border-t">
                            <td className="px-4 py-3">{w.word}</td>
                            <td className="px-4 py-3">{w.replacement}</td>
                            <td className="px-4 py-3 text-center">
                                <button
                                    onClick={() => alert("추후 수정/삭제 기능 예정")}
                                    className="text-xs text-blue-600 underline"
                                >
                                    수정
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
