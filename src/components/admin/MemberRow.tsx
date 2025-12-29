'use client';

import { Member } from './MemberDetailModal';
import StatusBadge from "@/components/admin/StatusBadge";

type Props = {
    member: Member;
    onSelect: (member: Member) => void;
};

// 회원 한 줄 UI (표시 전용)
export default function MemberRow({ member, onSelect }: Props) {
    return (
        <tr
            onClick={() => onSelect(member)}
            className="border-t cursor-pointer hover:bg-gray-50"
        >
            <td className="px-4 py-3">{member.organizationName}</td>
            <td className="px-4 py-3">{member.contactName}</td>
            <td className="px-4 py-3">{member.email}</td>
            <td className="px-4 py-3">{new Date(member.createdAt).toLocaleString()}</td>

            {/* 상태 */}
            <td className="px-4 py-3 flex justify-center">
               <StatusBadge status={member.registerStatus} />
            </td>

            {/* 관리 */}
            <td className="px-4 py-3 text-sm text-gray-400">
                클릭하여 상세
            </td>
        </tr>
    );
}
