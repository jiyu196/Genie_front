// app/components/b2b/InquiryGuide
export default function InquiryGuide() {
    return (
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-[#f6f8fb]">
            <div className="max-w-[520px] w-full bg-white rounded-2xl p-10 shadow-sm text-center">
                <h2 className="text-xl font-semibold text-[#19344e] mb-6">
                    기관 전용 서비스 안내
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                    Genie는 교육기관·단체를 위한 서비스로<br />
                    원활한 안내를 위해 <b>회원가입 및 관리자 승인 후</b><br />
                    구독 문의를 받고 있습니다.
                </p>

                <p className="text-gray-600 leading-relaxed mb-8">
                    가입 전 궁금한 사항은<br />
                    아래 연락처로 편하게 문의 주세요.
                </p>

                <div className="text-[#19344e] font-medium space-y-1">
                    <p>☎ 02-1234-4567</p>
                    <p className="text-sm text-gray-500">
                        ⏰ 평일 10:00 ~ 17:00
                    </p>
                </div>

                <div className="mt-10">
                    <a
                        href="/b2b/signup"
                        className="inline-block w-full py-3 rounded-xl bg-[#19344e] text-white font-medium hover:opacity-90"
                    >
                        기관 회원가입하기
                    </a>
                </div>
            </div>
        </div>
    );
}
