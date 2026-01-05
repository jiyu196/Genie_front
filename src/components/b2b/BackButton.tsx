"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/b2b/Button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="text-sm text-[#19344e]/70 hover:text-[#19344e] flex items-center gap-1"
        >
            ← 뒤로가기
        </Button>
    );
}
