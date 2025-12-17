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

            <div className="bg-white border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]">
                    <tr>
                        <th className="px-4 py-3 text-left">금칙어</th>
                        <th className="px-4 py-3 text-left">대체 표현</th>
                    </tr>
                    </thead>
                    <tbody>
                    {words.map(w => (
                        <tr key={w.id} className="border-t">
                            <td className="px-4 py-3">{w.word}</td>
                            <td className="px-4 py-3">{w.replacement}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
