// src/components/student/StudentBackground.tsx
export default function StudentBackground() {
    return (
        <>
            {/* 그라데이션 */}
            <div
                className="
                  absolute inset-0
                  bg-gradient-to-b
                  from-[#e6f2ff]
                  via-[#fde7f3]
                  to-[#fff3df]
                "
            />

            {/* 핑크 후광 */}
            <div
                className="
                  absolute inset-0
                  flex items-center justify-center
                  pointer-events-none
                "
            >
                <div
                    className="
                        w-[520px]
                        h-[520px]
                        rounded-full
                        bg-[radial-gradient(circle,_rgba(244,170,200,0.6)_0%,_rgba(244,170,200,0.3)_40%,_transparent_70%)]
                        blur-[80px]
                      "
                />
            </div>
        </>
    );
}
