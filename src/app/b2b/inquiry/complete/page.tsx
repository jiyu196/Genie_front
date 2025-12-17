import Link from "next/link";
import Button from "@/components/b2b/Button";

export default function InquiryCompletePage() {

    return (
        <div className="bg-[#F4F6FF] min-h-[calc(100vh-80px)] flex items-center">
            <section className="max-w-[640px] mx-auto px-6 text-center">
                {/* 아이콘 */}
                <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F6FF]">
                    <span className="text-2xl text-[#19344e]">✓</span>
                </div>

                {/* 타이틀 */}
                <h1 className="text-2xl font-bold text-[#19344e] mb-4">
                    도입 문의가 정상적으로 접수되었습니다
                </h1>

                {/* 설명 */}
                <p className="text-gray-600 leading-relaxed mb-10">
                    입력해주신 내용을 바탕으로<br />
                    담당자가 내부 검토 후 개별적으로 연락드릴 예정입니다.<br />
                    <br />
                    보통 영업일 기준 <strong>1~2일 이내</strong>에 안내드립니다.
                </p>

                {/* 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="px-8 hover:brightness-80">
                        <Link href="/b2b/plan">
                            구독 플랜 다시 보기
                        </Link>
                    </Button>

                    <Button variant="secondary" className="px-8 hover:brightness-90">
                        <Link href="/b2b">
                             메인으로 이동하기
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
