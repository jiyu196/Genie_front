
// members.ts 관리자 회원관리 조회때문에 타입 정리
export type RegisterStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminMember {
    email: string;
    organizationName: string;
    contactName: string;
    createdAt: string;
    registerStatus: RegisterStatus;
    rejectReason?: string | null;
}

export interface MemberPageResponse {
    content: AdminMember[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    isFirst: boolean;
    isLast: boolean;
}

// types/member.ts (또는 auth/member.ts)
export type Member = {
    email: string;
    accountStatus: "ACTIVE" | "INACTIVE" | "DELETED";
    bizNumber: string;
    organizationName: string;
    representativeName: string;
    contactName: string;
    registerStatus: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
    role: "MEMBER" | "SUBSCRIBER" | "ADMIN";
    approvedAt?: string | null;
    isTempPassword: boolean;
    passwordUpdatedAt: string;
};
