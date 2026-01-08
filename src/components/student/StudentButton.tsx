import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface StudentButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" ;
    fullWidth?: boolean;
}

export default function StudentButton({
                                          children,
                                          variant = "primary",
                                          fullWidth = false,
                                          className,
                                          ...props
                                      }: StudentButtonProps) {
    return (
        <button
            {...props}
            className={clsx(
                "py-3 rounded-[20px] font-bold text-[16px] transition active:scale-[0.98]",
                fullWidth && "w-full",

                variant === "primary" && `
                  bg-[#6b4f4f]
                  text-[#fffaf7]
                  shadow-[0_12px_24px_rgba(107,79,79,0.35)]
                  hover:bg-[#5a4242]
                  cursor-pointer
                `,

                variant === "ghost" && `
                  bg-white/70
                  text-[#6b4f4f]
                  border border-[#e8dede]
                  hover:bg-white
                  cursor-pointer
                `,

                className
            )}
        >
            {children}
        </button>
    );
}
