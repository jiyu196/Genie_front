
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
