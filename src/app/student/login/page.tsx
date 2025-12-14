export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6eeee]">
            <div className="w-[420px] bg-[#fffdf9] rounded-[32px] px-9 py-12 flex flex-col gap-5 shadow-lg">
                <h2 className="text-[28px] font-extrabold text-[#4a3b3b] text-center">
                    로그인
                </h2>

                <input
                    className="px-4 py-3 rounded-[18px] border-2 border-[#f1dada] bg-[#fff8d6]
                               text-sm outline-none focus:border-[#d48c8c]  placeholder:text-[#b39a6f]
                               focus:ring-2 focus:ring-[#d48c8c]/30"
                    placeholder="아이디 입력"
                />

                <input
                    type="password"
                    className="px-4 py-3 rounded-[18px] border-2 border-[#f1dada] bg-[#fff8d6]
                               text-sm outline-none focus:border-[#d48c8c]  placeholder:text-[#b39a6f]
                               focus:ring-2 focus:ring-[#d48c8c]/30"
                    placeholder="비밀번호 입력"
                />

                <button
                    className="mt-2 py-3 rounded-[20px] bg-[#4a3b3b] text-white
                               text-[16px] font-bold hover:bg-[#3a2e2e]"
                >
                    로그인
                </button>
            </div>
        </div>
    );
}
