export default function StudentMyWorksPage() {
    return (
        <div className="min-h-screen bg-[#f6eeee] px-6 py-10">
            <div
                className="
          max-w-7xl mx-auto
          grid gap-8
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
            >
                {[1, 2, 3].map((id) => (
                    <div
                        key={id}
                        className="
              bg-[#fffdf9]
              rounded-[36px]
              px-8 py-10
              flex flex-col
            "
                    >
                        {/* 문장 */}
                        <h3 className="text-center text-lg font-extrabold text-[#4a3b3b] mb-6 leading-snug">
                            토끼가 숲에서 친구들과 즐겁게 놀았어요
                        </h3>

                        {/* 네 컷 이미지 */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {[1, 2, 3, 4].map((img) => (
                                <div
                                    key={img}
                                    className="
                    aspect-square
                    rounded-[16px]
                    bg-[#f3dcdc]
                  "
                                />
                            ))}
                        </div>

                        {/* 버튼 */}
                        <div className="mt-auto flex justify-center">
                            <button
                                className="
                  px-6 py-2.5
                  rounded-full
                  bg-[#d48c8c]
                  text-white
                  text-sm
                  font-semibold
                  hover:opacity-90
                  transition
                "
                            >
                                이미지 다운로드
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
