type TokenStatusBarProps = {
    remaining: number;
    max: number;
};

export default function TokenStatusBar({
                                           remaining,
                                           max,
                                       }: TokenStatusBarProps) {
    return (
        <div
            className="
                sticky top-0 z-20
                bg-white/90 backdrop-blur
                px-4 py-2
                border-b
                border-[#6b4f4f]/30
                flex justify-center
              "
        >
            <div
                className="
                  flex items-center gap-2
                  text-sm font-semibold
                  px-4 py-1.5
                  rounded-full
                  bg-[#FFF8EE]
                  text-[#6b4f4f]
                "
            >
                ⭐ 오늘 남은 그림 기회
                <span className="text-base font-bold ">
          {remaining}
        </span>
                번
            </div>
        </div>
    );
}
