import { useEffect, useState } from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_TERM_QUERY} from "@/graphql/b2b/auth/getTerm";


type AgreementSectionProps = {
    onAgreeChange: (agreed: boolean) => void;  // 필수 동의 여부
    onTermsChange: (categories: string[]) => void; // 체크된 약관 카테고리
};

export default function AgreementSection({ onAgreeChange, onTermsChange }: AgreementSectionProps) {
    // useLazyQuery => 클릭했을때만 호출
    const [getTerm, {data, loading}] = useLazyQuery(GET_TERM_QUERY);

    const [service, setService] = useState(false); // 서비스 이용약관 (필수)
    const [privacy, setPrivacy] = useState(false); // 개인정보(필수)
    const [marketing, setMarketing] = useState(false); // 마케팅 (선택)

    // 전체동의
    const isAllChecked = service && privacy && marketing;

    // 약관 클릭시 모달
     const [isOpen, setIsOpen] = useState(false);
     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

     // 약관 클릭 핸들러
    const openTerm = async (category: "SERVICE" | "PRIVACY" | "MARKETING") => {
        setSelectedCategory(category);
        setIsOpen(true);

        await getTerm({
            variables: {
                input: {
                    termsCategory: category,
                },
            },
        });
    };

    // 약관 내용 줄 단위로 쪼갬 (가독성)
    const lines = data?.getTerm?.content?.split("\n") ?? [];

    useEffect(() => {
        onAgreeChange(service && privacy);

        const agreedCategories: string[] = [];
        if(service) agreedCategories.push("SERVICE");
        if(privacy) agreedCategories.push("PRIVACY");
        if(marketing) agreedCategories.push("MARKETING");

        onTermsChange(agreedCategories);
    }, [service, privacy, marketing]);

    return (
        <div className="text-sm space-y-2 mb-6 mt-4">
            {/* 전체동의 */}
            <label className="flex gap-2 cursor-pointer font-semibold mb-3">
                <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setService(checked);
                        setPrivacy(checked);
                        setMarketing(checked);
                    }}
                />
                전체 동의
            </label>

            <hr className="my-3" />

            <label className="flex gap-2 cursor-pointer font-medium">
                <input
                    type="checkbox"
                    checked={service}
                    onChange={(e) => setService(e.target.checked)}
                />
                <span
                    className="underline cursor-pointer"
                    onClick={() => openTerm("SERVICE")}
                >
                    Genie 이용약관 동의 (필수)
                </span>
            </label>

            <label className="flex gap-2 cursor-pointer font-medium">
                <input
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                />
                <span
                    className="underline cursor-pointer"
                    onClick={() => openTerm("PRIVACY")}
                >
                    개인정보 수집 및 이용 동의 (필수)
                </span>
            </label>

            <label className="flex gap-2 cursor-pointer text-gray-400">
                <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                />
                <span
                    className="underline cursor-pointer"
                    onClick={() => openTerm("MARKETING")}
                >
                    마케팅 정보 수신 동의 (선택)
                </span>
            </label>

        {/* 약관 모달 */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white w-[520px] max-h-[75vh] rounded-2xl p-6 flex flex-col">

                        {/* 제목 + 필수 여부 */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">
                                {data?.getTerm?.title}
                            </h2>
                        </div>

                        {/* 본문 */}
                        <div className="flex-1 overflow-y-auto pr-1">
                            {loading ? (
                                <p className="text-sm text-gray-500">약관을 불러오는 중입니다…</p>
                            ) : (
                                <div className="space-y-4 text-sm leading-7 text-gray-800">
                                    {lines.map((line:string, i:number) => {
                                        // 요약 블록
                                        if (line.startsWith("[요약")) {
                                            return (
                                                <div
                                                    key={i}
                                                    className="bg-gray-50 border-l-4 border-[#19344e] p-4 rounded"
                                                >
                                                    <p className="font-medium text-gray-900">{line}</p>
                                                </div>
                                            );
                                        }

                                        // 번호 항목 제목 (1. 2. 3. 과 같은거)
                                        if (/^\d+\./.test(line)) {
                                            return (
                                                <h3
                                                    key={i}
                                                    className="font-semibold text-gray-900 mt-6"
                                                >
                                                    {line}
                                                </h3>
                                            );
                                        }

                                        // 일반 문단
                                        return (
                                            <p key={i} className="text-gray-700">
                                                {line}
                                            </p>
                                        );
                                    })}
                                </div>

                            )}
                        </div>

                        {/* 버튼 */}
                        <button
                            className="mt-6 w-full py-3 rounded-lg bg-[#19344e] text-white font-medium cursor-pointer hover:bg-[#19344e]/70"
                            onClick={() => setIsOpen(false)}
                        >
                            확인했습니다
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
