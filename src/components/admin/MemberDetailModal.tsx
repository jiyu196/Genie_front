'use client';

import Button from "@/components/b2b/Button";
import StatusBadge from "@/components/admin/StatusBadge";
import {useState} from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";
import {adminDownloadByLink} from "@/utils/adminDownload";

type MemberStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type Member = {
    email: string;
    organizationName: string;
    bizNumber: string;
    contactName: string;
    createdAt: string;
    registerStatus: MemberStatus;
    rejectReason?: string | null;

    businessLicenseUrl?: string;
    employmentCertUrl?: string;
};

type Props = {
    member: Member;
    onClose: () => void;
    onApprove: (email: string) => void;
    onReject: (email: string) => void;
};

export default function MemberDetailModal({
                                              member,
                                              onClose,
                                              onApprove,
                                              onReject,
                                          }: Props) {

    // 승인, 반려 후 상태변경
    const [isReopenConfirmOpen, setIsReopenConfirmOpen] = useState(false);

    // 다운로드
    const makeDownloadUrl = (url: string, filename: string) => {
        const encoded = encodeURIComponent(filename);
        return `${url}?response-content-disposition=attachment;filename*=UTF-8''${encoded}`;
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="max-w-[450px] w-full bg-white rounded-2xl shadow px-10 py-8 relative">

                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                    ✕
                </button>

                <h1 className="text-2xl font-bold text-[#19344e] mb-8">
                    기관 회원가입 요청 상세
                </h1>

                {/* 상태 요약 */}
                <section className="mb-8">
                    <div className="rounded-lg border p-5 bg-gray-30 space-y-4">

                        {/* 상단: 상태 + 요청일 */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">현재 상태</p>
                                <StatusBadge status={member.registerStatus} />
                            </div>

                            <div className="text-left text-xs text-gray-500 mb-1">
                                <p>요청일</p>
                                <p className="font-medium text-gray-700 mt-2">
                                    {new Date(member.createdAt).toLocaleString("ko-KR")}
                                </p>
                            </div>
                        </div>

                        {/* 상태 설명 */}
                        <div className="text-xs text-gray-500">
                            {member.registerStatus === "PENDING" && "관리자 검토 대기 중"}
                            {member.registerStatus === "APPROVED" && "관리자에 의해 승인됨"}
                            {member.registerStatus === "REJECTED" && "관리자에 의해 반려됨"}
                        </div>

                        {/* 반려 사유 */}
                        {member.registerStatus === "REJECTED" && member.rejectReason && (
                            <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                                <p className="text-xs font-semibold text-red-600 mb-1">반려 사유</p>
                                <p className="text-sm text-gray-700">
                                    {member.rejectReason}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 기본 정보 */}
                <section className="mb-8 space-y-3">
                    <h2 className="font-semibold text-lg text-gray-700">
                        기본 정보
                    </h2>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">기관명</span>
                            <p className="font-medium">{member.organizationName}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">사업자등록번호</span>
                            <p className="font-medium">{member.bizNumber}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">담당자</span>
                            <p className="font-medium">{member.contactName}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">이메일</span>
                            <p className="font-medium">{member.email}</p>
                        </div>
                    </div>
                </section>

                {/* 제출 서류 */}
                <section className="mb-8 space-y-4">
                    <h2 className="font-semibold text-lg text-gray-700">
                        제출 서류
                    </h2>

                    <div className="border rounded-lg p-4 space-y-3 text-sm">
                        {/* 사업자등록증 */}
                        <div className="flex justify-between items-center">
                            <span>사업자등록증</span>
                            <div className="flex gap-3">
                                {member.businessLicenseUrl ? (
                                    <>
                                        {/* 미리보기 */}
                                        <a
                                            href={member.businessLicenseUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#19344e] underline"
                                        >
                                            미리보기
                                        </a>

                                        {/* 다운로드 */}
                                        <button
                                            type="button"
                                            className="text-gray-600 underline cursor-pointer"
                                            onClick={() =>
                                                adminDownloadByLink(
                                                    member.businessLicenseUrl!,
                                                    `${member.organizationName}_사업자등록증`
                                                )
                                            }
                                        >
                                            다운로드
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-400">파일 없음</span>
                                )}
                            </div>
                        </div>

                        {/* 재직증명서 */}
                        <div className="flex justify-between items-center">
                            <span>재직증명서</span>
                            <div className="flex gap-3">
                                {member.employmentCertUrl ? (
                                    <>
                                        {/* 미리보기 */}
                                        <a
                                            href={member.employmentCertUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#19344e] underline"
                                        >
                                            미리보기
                                        </a>

                                        {/* 다운로드 */}
                                        <button
                                            type="button"
                                            className="text-gray-600 underline cursor-pointer"
                                            onClick={() =>
                                                adminDownloadByLink(
                                                    member.employmentCertUrl!,
                                                    `${member.organizationName}_재직증명서`
                                                )
                                            }
                                        >
                                            다운로드
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-400">파일 없음</span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 승인 / 반려 */}
                <section className="pt-6 flex justify-center gap-3">

                    {/* PENDING: 바로 승인 / 반려 */}
                    {member.registerStatus === "PENDING" && (
                        <>
                            <Button
                                variant="secondary"
                                className="w-full border border-gray-300"
                                onClick={() => onApprove(member.email)}
                            >
                                승인
                            </Button>

                            <Button
                                variant="secondary"
                                className="w-full border border-gray-300 text-red-600 hover:bg-red-50"
                                onClick={() => onReject(member.email)}
                            >
                                반려
                            </Button>
                        </>
                    )}

                    {/* APPROVED / REJECTED: 상태 변경 */}
                    {member.registerStatus !== "PENDING" && (
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsReopenConfirmOpen(true)}
                        >
                            상태 변경
                        </Button>
                    )}

                </section>

                {isReopenConfirmOpen && (
                    <ConfirmModal
                        onApprove={() => {
                            onApprove(member.email);
                            setIsReopenConfirmOpen(false);
                        }}
                        onReject={() => {
                            onReject(member.email);
                            setIsReopenConfirmOpen(false);
                        }}
                        onCancel={() => setIsReopenConfirmOpen(false)}
                    />
                )}


            </div>
        </div>
    );
}
