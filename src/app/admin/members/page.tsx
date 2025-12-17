"use client";

import { useState } from "react";

type MemberStatus = "PENDING" | "APPROVED" | "REJECTED";

type Member = {
    id: number;
    organization: string;
    manager: string;
    email: string;
    createdAt: string;
    status: MemberStatus;
};

const initialMembers: Member[] = [
    {
        id: 1,
        organization: "서울초등학교",
        manager: "박지니",
        email: "admin@school.ac.kr",
        createdAt: "2025-12-17",
        status: "PENDING",
    },
];

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>(initialMembers);

    const updateStatus = (id: number, status: MemberStatus) => {
        setMembers(prev =>
            prev.map(m =>
                m.id === id ? { ...m, status } : m
            )
        );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-[#19344e]">회원 관리</h1>

            <div className="bg-white border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]">
                    <tr>
                        <th className="px-4 py-3 text-left">기관명</th>
                        <th className="px-4 py-3 text-left">담당자</th>
                        <th className="px-14 py-3 text-left">이메일</th>
                        <th className="px-7 py-3 text-left">가입일</th>
                        <th className="px-7 py-3 text-left">상태</th>
                        <th className="px-11 py-3 text-left">관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map(member => (
                        <tr key={member.id} className="border-t">
                            <td className="px-4 py-3">{member.organization}</td>
                            <td className="px-4 py-3">{member.manager}</td>
                            <td className="px-4 py-3">{member.email}</td>
                            <td className="px-4 py-3">{member.createdAt}</td>
                            <td className="px-4 py-3">
                                {member.status === "PENDING" && (
                                    <span className="text-[#fD91c]">승인 대기</span>
                                )}
                                {member.status === "APPROVED" && (
                                    <span className="text-green-600">승인 완료</span>
                                )}
                                {member.status === "REJECTED" && (
                                    <span className="text-red-500">반려</span>
                                )}
                            </td>
                            <td className="px-4 py-3 space-x-2">
                                <button
                                    onClick={() => updateStatus(member.id, "APPROVED")}
                                    className="text-xs px-2 py-1 border hover:brightness-5 cursor-pointer"
                                >
                                    승인
                                </button>
                                <button
                                    onClick={() => updateStatus(member.id, "REJECTED")}
                                    className="text-xs px-2 py-1 border hover:brightness-5 cursor-pointer"
                                >
                                    반려
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
