import Image from 'next/image';

export default function B2BFooter() {

    return (

        <footer className="bg-[#F4F6FF] border-t border-[#19344e]/10">
            <div className="mx-auto max-w-[1200px] px-6 py-8 text-sm text-[#19344e]/70">

                {/* 상단 정책 링크 */}
                <div className="flex flex-wrap gap-6 mb-3 text-sm">
                    <span className="hover:text-[#19344e] cursor-pointer">이용약관</span>
                    <span className="hover:text-[#19344e] cursor-pointer">개인정보 처리방침</span>
                    <span className="hover:text-[#19344e] cursor-pointer">운영정책</span>
                    <span className="hover:text-[#19344e] cursor-pointer">공지사항</span>
                </div>

                {/* 메인 정보 영역 */}
                <div className="flex flex-col md:flex-row justify-between gap-10">

                    {/* 회사 정보 */}
                    <div className="space-y-2">
                        <Image
                            src="/images/b2bLogo.svg"
                            alt="Genie"
                            width={90}
                            height={30}
                        />
                        <p className="font-medium">(주) 지니</p>
                        <p>서울특별시 강남구 테크로 123</p>
                        <p>사업자등록번호 000-12-34567</p>
                    </div>

                    {/* 고객센터 */}
                    <div className="space-y-2">
                        <p className="font-medium text-[#19344e]">고객센터</p>
                        <p className="text-xl font-semibold text-[#19344e]">
                            000-123-4567
                        </p>
                        <p className="text-xs">
                            평일 09:00 ~ 18:00 (주말 · 공휴일 제외)
                        </p>
                    </div>
                </div>

                {/* 하단 카피라이트 */}
                <div className="mt-8 pt-4 border-t border-[#19344e]/10 text-xs text-[#19344e]/50">
                    © 2025 GenieTune. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
