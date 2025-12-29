'use client';

import { Member } from './MemberDetailModal';
import MemberRow from './MemberRow';

type Props = {
    members: Member[];
    onSelect: (member: Member) => void;
};

// 회원 리스트 구조 -> 테이블 구조, map 담당
export default function MemberTable({ members, onSelect }: Props) {
    return (
        <div className="bg-white border border-gray-200">
            <table className="w-full text-sm">
                <thead className="bg-[#F4F6FF] text-[#19344e]">
                <tr>
                    <th className="px-4 py-3 text-left">기관명</th>
                    <th className="px-4 py-3 text-left">담당자</th>
                    <th className="px-4 py-3 text-left">이메일</th>
                    <th className="px-4 py-3 text-left">가입일</th>
                    <th className="px-4 py-3 text-left">상태</th>
                    <th className="px-4 py-3 text-left">관리</th>
                </tr>
                </thead>
                <tbody>
                {members.map(member => (
                    <MemberRow
                        key={member.email}
                        member={member}
                        onSelect={onSelect}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}
