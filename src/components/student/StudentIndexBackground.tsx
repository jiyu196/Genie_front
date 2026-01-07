// src/components/student/StudentBackground.tsx
export default function StudentIndexBackground() {
    return (
        <>
            {/* 중앙 핑크 후광 */}
            <div
                className="
                    absolute inset-0
                    flex items-center justify-center
                    pointer-events-none
                    z-0
                  "
            >
                {/* 중심 빛 */}
                <div
                    className="
                      absolute
                      w-[520px]
                      h-[520px]
                      rounded-full
                      bg-[radial-gradient(circle,_rgba(244,170,200,0.65)_0%,_rgba(244,170,200,0.35)_40%,_transparent_70%)]
                      blur-[60px]
                    "
                />

                {/* 바깥 퍼짐 */}
                <div
                    className="
                      absolute
                      w-[1000px]
                      h-[1000px]
                      rounded-full
                      bg-[radial-gradient(circle,_rgba(253,200,220,0.45)_0%,_rgba(253,200,220,0.25)_35%,_transparent_75%)]
                      blur-[160px]
                     "
                />
            </div>
        </>
    );
}
