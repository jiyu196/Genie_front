// app/b2b/(auth)/layout.tsx
import Link from "next/link";

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f6f7fb] flex flex-col">
            {/* 중앙 영역 */}
            <main className="flex-1 flex items-center justify-center px-4">
                {children}
            </main>
        </div>
    );
}
