"use client";

import { useRouter } from "next/navigation";
import StudentBackground from "@/components/student/StudentBackground";
import StudentHeader from "@/components/student/StudentHeader";
import StudentButton from "@/components/student/StudentButton";

export default function StudentNotFound() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen flex flex-col">
            <StudentBackground />
            <StudentHeader />

            <main className="flex-1 flex items-center justify-center z-10">
                <div className="bg-white rounded-2xl px-10 py-8 text-center shadow-lg">
                    <h1 className="text-5xl font-bold mb-4">404</h1>
                    <p className="text-gray-600 mb-6">
                        페이지를 찾을 수 없어요 😢
                    </p>

                    <StudentButton
                        onClick={() => router.push("/student")}
                        className="px-6 py-2 rounded-full bg-[#19344e] text-white"
                    >
                        학습 사이트 홈으로
                    </StudentButton>
                </div>
            </main>
        </div>
    );
}
