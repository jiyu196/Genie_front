import StudentButton from "@/components/student/StudentButton";

type Work = {
    id: number;
    sentence: string;
    images: string[]; // 나중에 AI 이미지 URL 배열
};

const mockWorks: Work[] = [
    {
        id: 1,
        sentence: "토끼가 숲에서 친구들과 즐겁게 놀았어요",
        images: ["", "", "", ""], // 최대 4컷
    },
    {
        id: 2,
        sentence: "용감한 고양이가 별을 찾아 떠났어요",
        images: ["", ""], // 2컷도 가능
    },
];

export default function StudentMyWorksPage() {
    return (
        <div
            className="
        min-h-screen
        px-6 py-16
        bg-gradient-to-b
        from-[#e6f2ff]
        via-[#fde7f3]
        to-[#fff3df]
      "
        >
            <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {mockWorks.map((work) => (
                    <div
                        key={work.id}
                        className="
              bg-white
              rounded-[36px]
              px-8 py-8
              flex flex-col
              shadow-[0_20px_40px_rgba(0,0,0,0.08)]
            "
                    >
                        {/* 문장 */}
                        <h3 className="text-center text-lg font-extrabold text-[#3b2d2d] mb-5 leading-snug">
                            {work.sentence}
                        </h3>

                        {/* 만화 프레임 */}
                        <div
                            className={`
                grid gap-3 mb-6
                ${
                                work.images.length <= 2
                                    ? "grid-cols-2"
                                    : "grid-cols-2"
                            }
              `}
                        >
                            {work.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className="
                    aspect-square
                    rounded-[18px]
                    bg-[#f3f1f1]
                    flex items-center justify-center
                    text-sm text-[#9c8f8f]
                  "
                                >
                                    이미지 {idx + 1}
                                </div>
                            ))}
                        </div>

                        {/* 버튼 */}
                        <div className="mt-auto flex justify-center">
                            <StudentButton className="px-4 py-2">
                                이미지 다운로드
                            </StudentButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
