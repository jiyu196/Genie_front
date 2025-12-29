'use client';

import { useState } from 'react';
import Button from "@/components/b2b/Button";

type Props = {
    onClose: () => void;
    onConfirm: (reason: string) => void;
};

// 가입 요청 반려 사유 입력
export default function RejectReasonModal({ onClose, onConfirm }: Props) {
    const [reason, setReason] = useState('');

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl w-[400px] p-6 space-y-4">
                <h2 className="text-lg font-semibold text-[#19344e]">
                    반려 사유 입력
                </h2>

                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full h-[100px] border rounded p-2 text-sm"
                    placeholder="반려 사유를 입력해주세요"
                />

                <div className="flex justify-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onClose}
                        className="text-xs hover:bg-[#19344e]/80"
                    >
                        취소
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-50 text-xs"
                        onClick={() => onConfirm(reason)}
                        disabled={!reason.trim()}
                    >
                        반려 확정
                    </Button>
                </div>
            </div>
        </div>
    );
}
