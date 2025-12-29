'use client';

import Button from "@/components/b2b/Button";

type Props = {
    onApprove: () => void;
    onReject: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
                                               onApprove,
                                               onReject,
                                               onCancel,
                                           }: Props) {
    return (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center">
            <div className="w-[360px] bg-white rounded-xl p-6 shadow-lg text-center">
                {/* 제목 */}
                <h2 className="text-base font-semibold text-[#19344e] mb-2">
                    상태 변경
                </h2>

                {/* 설명 */}
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    이미 처리된 요청입니다.<br />
                    변경할 상태를 선택해주세요.
                </p>

                {/* 버튼 영역 */}
                <div className="flex flex-col gap-2 items-center">
                    <Button
                        variant="secondary"
                        className="w-full border border-gray-300"
                        onClick={onApprove}
                    >
                        승인으로 변경
                    </Button>

                    <Button
                        variant="secondary"
                        className="w-full border border-gray-300 text-red-600 hover:bg-red-50"
                        onClick={onReject}
                    >
                        반려로 변경
                    </Button>

                    <button
                        onClick={onCancel}
                        className="mt-3 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>

    );
}
