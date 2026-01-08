"use client";

import { useState } from "react";
import ApprovedHeader from "@/components/b2b/mypage/ApprovalHeader";
import Button from "@/components/b2b/Button";
import { User } from "@/store/slice/authSlice";
import {UPDATE_MEMBER_INFO} from "@/graphql/b2b/member/updateInfo";
import {useMutation} from "@apollo/client";

type Props = {
    member: User;
};

export default function OrganizationClient({ member }: Props) {
    const [editing, setEditing] = useState(false);

    const [contactName, setContactName] = useState(member.contactName);
    const [representativeName, setRepresentativeName] = useState(
        member.representativeName
    );

    const [updateMemberInfo] = useMutation(UPDATE_MEMBER_INFO);

    const handleCancel = () => {
        setContactName(member.contactName);
        setRepresentativeName(member.representativeName);
        setEditing(false);
    };

    const handleSave = async () => {
       await updateMemberInfo({
            variables: {
                input: {
                    representativeName,
                    contactName
                }
            }
        })

        setEditing(false);
    };

    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
            {/* 승인 상태 */}
            <ApprovedHeader />

            {/* 기관 정보 */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e7eb]">
                <div className="px-8 py-6 border-b flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-[#19344e]">
                            기관 정보
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            가입 시 등록한 기관 및 담당자 정보입니다.
                        </p>
                    </div>

                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="text-sm text-[#19344e] font-bold hover:underline cursor-pointer"
                        >
                            [수정]
                        </button>
                    )}
                </div>

                <div className="px-8 py-6 grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
                    <InfoRow label="기관명" value={member.organizationName} />
                    <InfoRow label="사업자등록번호" value={member.bizNumber} />

                    {/* 담당자명 */}
                    <EditableRow
                        label="담당자명"
                        editing={editing}
                        value={contactName}
                        onChange={setContactName}
                    />

                    <InfoRow label="담당자 이메일" value={member.email} />

                    {/* 대표자명 */}
                    <EditableRow
                        label="대표자명"
                        editing={editing}
                        value={representativeName}
                        onChange={setRepresentativeName}
                    />
                </div>

                {/* 하단 버튼 */}
                {editing && (
                    <div className="px-8 py-5 border-t flex justify-end gap-3">
                        <Button variant="outline" onClick={handleCancel}>
                            취소
                        </Button>
                        <Button onClick={handleSave}>
                            저장
                        </Button>
                    </div>
                )}
            </div>

            {/* 다음 단계 */}
            <div className="bg-[#F9FAFB] border border-dashed border-gray-300 rounded-xl px-6 py-5">
                <p className="text-sm text-gray-700">
                    이제 <b>구독 플랜 설정</b>을 진행해보세요.
                </p>
            </div>
        </section>
    );
}

/* 읽기 전용 Row */
function InfoRow({
                     label,
                     value,
                 }: {
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1">
            <p className="text-gray-500">{label}</p>
            <p className="font-medium text-[#19344e]">{value}</p>
        </div>
    );
}

/* 수정 가능한 Row */
function EditableRow({
                         label,
                         value,
                         editing,
                         onChange,
                     }: {
    label: string;
    value: string;
    editing: boolean;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-1">
            <p className="text-gray-500">{label}</p>

            {editing ? (
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#19344e]"
                />
            ) : (
                <p className="font-medium text-[#19344e]">{value}</p>
            )}
        </div>
    );
}
