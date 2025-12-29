// import StatusBadge from "@/components/admin/StatusBadge";
//
// type RegisterStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
//
// export default function ApprovalHeader({
//                                            status,
//                                        }: {
//     status: RegisterStatus;
// }) {
//     return (
//         <div className="flex items-center gap-3 px-6 py-4 bg-[#F4F6FF]/50">
//             <StatusBadge status={status} />
//
//             <span className="text-sm text-[#19344e]/70">
//                 {status === "APPROVED" && "관리자 승인 완료 상태입니다."}
//                 {status === "REJECTED" && "관리자 승인 반려 상태입니다."}
//                 {status === "PENDING" && "관리자 승인 대기 상태입니다."}
//                 {status === "CANCELLED" && "가입이 취소된 계정입니다."}
//             </span>
//         </div>
//     );
// }
