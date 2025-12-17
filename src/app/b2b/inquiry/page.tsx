import Button from "@/components/b2b/Button";
import Link from "next/link";

export default function InquiryPage() {
    return (
        <div className="bg-white">
            <section className="py-20 bg-[#F4F6FF] text-center">
                <h1 className="text-3xl font-bold text-[#19344e] mb-4">
                    Genie 도입 문의
                </h1>
                <p className="text-gray-600">
                    기관 정보를 남겨주시면<br />
                    담당자가 검토 후 안내드립니다.
                </p>
            </section>

            <section className="max-w-[720px] mx-auto px-6 py-20">
                <form className="space-y-6">
                    {/* 기관명 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            기관명
                        </label>
                        <input
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="예) ○○초등학교"
                        />
                    </div>

                    {/* 담당자 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            담당자명
                        </label>
                        <input
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="이름"
                        />
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            이메일
                        </label>
                        <input
                            type="email"
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="contact@email.com"
                        />
                    </div>

                    {/* 연락처 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            연락처
                        </label>
                        <input
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="010-0000-0000"
                        />
                    </div>

                    {/* 학생 수 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            예상 학생 수
                        </label>
                        <select className="w-full border rounded-lg px-4 py-3">
                            <option>10명 이하</option>
                            <option>11~50명</option>
                            <option>51~100명</option>
                            <option>100명 이상</option>
                        </select>
                    </div>

                    {/* 문의 내용 */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            문의 내용 (선택)
                        </label>
                        <textarea
                            className="w-full border rounded-lg px-4 py-3 h-32"
                            placeholder="운영 방식, 일정 등"
                        />
                    </div>

                    <Link href="/b2b/inquiry/complete">
                        <Button className="w-full cursor-pointer hover:brightness-80">
                            문의 제출
                        </Button>
                    </Link>
                </form>
            </section>
        </div>
    );
}
