// components/b2b/mypage/ApprovedHeader.tsx
import { CheckCircle2 } from "lucide-react";

export default function ApprovedHeader() {
    return (
        <div className="flex items-start gap-3 px-6 py-5 bg-white rounded-xl border border-[#e5e7eb]">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />

            <div className="space-y-1">
                <p className="text-sm font-semibold text-[#19344e]">
                    관리자 승인 완료
                </p>
                <p className="text-sm text-gray-600">
                    Genie 서비스를 정상적으로 이용하실 수 있습니다.
                </p>
            </div>
        </div>
    );
}
