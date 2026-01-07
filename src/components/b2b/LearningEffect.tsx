import Image from "next/image";

export default function LearningEffect() {
    return (
        <section className="pt-23 pb-30 bg-[#f6f9ff]">
            <div className="mx-auto max-w-[1200px] px-6 grid md:grid-cols-2 gap-20 items-center">

                {/* 텍스트 영역 */}
                <div>
                    <div className="mb-12">
                        <p className="text-sm font-semibold text-[#F59E0B]">
                            학습 설계 구조
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-[#19344e] leading-snug">
                            지니튠은 이렇게<br />
                            언어 학습을 설계했습니다
                        </h2>
                        <div className="mt-4 w-10 h-[2px] bg-[#19344e]/20" />
                    </div>

                    <ul className="space-y-7 text-[#19344e]/80">
                        <li>
                            <strong className="block text-[#19344e]">
                                1. 단어 선택
                            </strong>
                            <p className="text-sm mt-1">
                                아이가 직접 단어를 고르며 이야기의 요소를 구성합니다.
                            </p>
                        </li>

                        <li>
                            <strong className="block text-[#19344e]">
                                2. 문장 구성
                            </strong>
                            <p className="text-sm mt-1">
                                선택한 단어를 연결해 문장을 만들어봅니다.
                            </p>
                        </li>

                        <li>
                            <strong className="block text-[#19344e]">
                                3. 이미지 생성
                            </strong>
                            <p className="text-sm mt-1">
                                작성한 문장이 그림 이야기로 시각화됩니다.
                            </p>
                        </li>

                        <li>
                            <strong className="block text-[#19344e]">
                                4. 결과 확인
                            </strong>
                            <p className="text-sm mt-1">
                                완성된 이야기를 보며 자신의 생각을 돌아봅니다.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center">

                    <div className="space-y-10 max-w-sm">

                        {/* STEP 카드 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#19344e]/10">
                            <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                              STEP 1
                            </span>
                            <h4 className="text-lg font-bold text-[#19344e]">
                                단어를 작성합니다.
                            </h4>
                            <p className="mt-2 text-sm text-[#19344e]/70 leading-relaxed">
                                아이가 직접 단어를 작성하여 이야기의 재료를 준비합니다.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#19344e]/10">
                            <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                              STEP 2
                            </span>
                            <h4 className="text-lg font-bold text-[#19344e]">
                                문장을 만듭니다
                            </h4>
                            <p className="mt-2 text-sm text-[#19344e]/70 leading-relaxed">
                                선택한 단어를 연결해 문장을 구성합니다.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#19344e]/10">
                            <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                              STEP 3
                            </span>
                            <h4 className="text-lg font-bold text-[#19344e]">
                                그림 이야기로 완성됩니다
                            </h4>
                            <p className="mt-2 text-sm text-[#19344e]/70 leading-relaxed">
                                작성한 문장이 그림 이야기로 시각화됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
