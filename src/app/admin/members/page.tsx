'use client';

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import MemberTable from "@/components/admin/MemberTable";
import MemberDetailModal, { Member } from "@/components/admin/MemberDetailModal";
import RejectReasonModal from "@/components/admin/RejectReasonModal";

import { GET_ADMIN_MEMBERS } from "@/graphql/admin/members";
import {HANDLE_REGISTER} from "@/graphql/admin/handleRegister";
import Button from "@/components/b2b/Button";

export default function MembersPage() {
    // 페이지네이션
    const [page, setPage] = useState(1);
    const size = 10;

    // 검색
    const [keyword, setKeyword] = useState("");
    const [searchType, setSearchType] = useState<
        "ALL" | "EMAIL" | "ORGANIZATION_NAME"
    >("ALL");

    // 대기, 승인, 반려 상태 필터
    const [registerStatus, setRegisterStatus] = useState<
        "" | "PENDING" | "APPROVED" | "REJECTED"
    >("");

    // 목록 조회
    const { data, refetch } = useQuery(GET_ADMIN_MEMBERS, {
        variables: {
            input: {
                page,
                size,
                condition: {
                    memberSearchType: searchType,
                    keyword: keyword || null,
                    registerStatus: registerStatus || null,
                },
            },
        },
    });

    // 승인 / 반려 mutation
    const [handleRegister] = useMutation(HANDLE_REGISTER);

    // 선택된 회원 (모달용)
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    // 반려 모달
    const [isRejectOpen, setIsRejectOpen] = useState(false);

    const members: Member[] = data?.getAllMembers.content ?? [];

    // 승인
    const onApprove = async (email: string) => {
        await handleRegister({
            variables: {
                input: {
                    email,
                    registerStatus: "APPROVED",
                },
            },
        });

        setSelectedMember(null);
        await refetch();
    };

    // 반려. 모달에서 사유 입력시 디비 들어감
    const onRejectConfirm = async (reason: string) => {
        if (!selectedMember) return;

        await handleRegister({
            variables: {
                input: {
                    email: selectedMember.email,
                    registerStatus: "REJECTED",
                    rejectReason: reason,
                },
            },
        });

        setIsRejectOpen(false);
        setSelectedMember(null);
        await refetch();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-[#19344e]">회원 관리</h1>

            {/* 검색 & 필터 */}
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-md">
                <div className="flex flex-wrap items-center gap-2">

                    {/* 검색 기준 */}
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">검색 기준</span>
                        <select
                            value={searchType}
                            onChange={e => setSearchType(e.target.value as any)}
                            className="h-8 px-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                        >
                            <option value="ALL">전체</option>
                            <option value="EMAIL">이메일</option>
                            <option value="ORGANIZATION_NAME">기관명</option>
                        </select>
                    </div>

                    {/* 상태 필터 */}
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">상태</span>
                        <select
                            value={registerStatus}
                            onChange={e => setRegisterStatus(e.target.value as any)}
                            className="h-8 px-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                        >
                            <option value="">전체</option>
                            <option value="PENDING">승인 대기</option>
                            <option value="APPROVED">승인 완료</option>
                            <option value="REJECTED">반려</option>
                        </select>
                    </div>

                    {/* 구분선 */}
                    <div className="mx-2 h-5 w-px bg-gray-300" />

                    {/* 검색어 */}
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        placeholder="검색어 입력"
                        className="h-8 px-3 text-sm border border-gray-300 rounded-md w-[220px]"
                    />

                    {/* 검색 버튼 */}
                    <Button size="sm" className="h-8 px-4 text-xs">
                        검색
                    </Button>
                </div>
            </div>


            <MemberTable
                members={members}
                onSelect={setSelectedMember}
            />

            {/* 페이지 네이션 */}
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    disabled={data?.getAllMembers.isFirst}
                    onClick={() => setPage(p => p - 1)}
                >
                    이전
                </Button>

                <span className="text-sm py-1">
                  {data?.getAllMembers.currentPage} / {data?.getAllMembers.totalPages}
                </span>

                <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    disabled={data?.getAllMembers.isLast}
                    onClick={() => setPage(p => p + 1)}
                >
                    다음
                </Button>
            </div>


            {selectedMember && (
                <MemberDetailModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                    onApprove={onApprove}
                    onReject={() => setIsRejectOpen(true)}
                />
            )}

            {isRejectOpen && selectedMember && (
                <RejectReasonModal
                    onClose={() => setIsRejectOpen(false)}
                    onConfirm={onRejectConfirm}
                />
            )}
        </div>
    );
}
