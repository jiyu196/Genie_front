// "use client";
//
// import ApprovalHeader from "./ApprovalHeader";
// import type { Member } from "@/types/admin/member";
//
// type Props = {
//     member: Member;
// };
//
// export default function OrganizationClient({ member }: Props) {
//     return (
//         <section className="max-w-[960px] ml-8 mt-7 space-y-8">
//             <ApprovalHeader status={member.registerStatus} />
//
//             <div className="bg-white rounded-2xl shadow-sm max-w-[640px] overflow-hidden">
//                 <div className="p-8 space-y-6">
//                     <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">기관명</span>
//                         <span className="text-sm font-medium text-[#19344e]">
//                             {member.organizationName}
//                         </span>
//                     </div>
//
//                     <div className="flex justify-between">
//                         <span className="text-sm text-gray-500">담당자 이메일</span>
//                         <span className="text-sm font-medium text-[#19344e]">
//                             {member.email}
//                         </span>
//                     </div>
//
//                     {member.registerStatus === "REJECTED" && (
//                         <div className="flex justify-between">
//                             <span className="text-sm text-gray-500">반려 사유</span>
//                             <span className="text-sm font-medium text-red-600">
//                                 {member.rejectReason ?? "-"}
//                             </span>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }
