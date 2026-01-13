"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SALES } from "@/graphql/admin/getAdminSales";
import Button from "@/components/b2b/Button";

export default function SubscriptionsPage() {
    const [page, setPage] = useState(1);
    const size = 10;

    const { data, loading, error } = useQuery(GET_ALL_SALES, {
        variables: {
            input: {
                page,
                size,
                salesSearchCondition: {},
            },
        },
        fetchPolicy: "no-cache",
    });

    const pageInfo = data?.getAllSales;
    const sales = pageInfo?.content ?? [];

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                매출 데이터를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-[#19344e]">매출 관리</h1>

            {/* 테이블 */}
            <div className="bg-white border border-gray-200 rounded-md">
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e] text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left w-[22%]">기관명</th>
                            <th className="px-4 py-3 text-left w-[20%]">플랜</th>
                            <th className="px-4 py-3 text-center w-[10%] whitespace-nowrap">결제수단</th>
                            <th className="px-4 py-3 text-center w-[15%]">카드사</th>
                            <th className="px-10 py-3 text-right w-[15%]">금액</th>
                            <th className="px-4 py-3 text-center w-[10%]">상태</th>
                        </tr>
                    </thead>

                    <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                데이터를 불러오는 중입니다...
                            </td>
                        </tr>
                    )}

                    {!loading && sales.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                매출 내역이 없습니다.
                            </td>
                        </tr>
                    )}

                    {sales.map((sale: any, idx: number) => (
                        <tr
                            key={idx}
                            className="border-t hover:bg-gray-50 transition-colors h-[52px]"
                        >
                            {/* 기관명 */}
                            <td className="px-4 py-3">
                                <div className="flex items-center h-full">
                                    {sale.organizationName}
                                </div>
                            </td>

                            {/* 플랜 */}
                            <td className="px-4 py-3">
                                <div className="flex items-center h-full">
                                    {sale.displayName}
                                </div>
                            </td>

                            {/* 결제수단 */}
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center h-full">
                                    {sale.pgType}
                                </div>
                            </td>

                            {/* 카드사 */}
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center h-full text-sm text-gray-700 whitespace-nowrap">
                                    {sale.pgType === "CARD"
                                        ? `카드 · ${sale.cardCompany
                                            ?.replace("_CARD", "")
                                            .replace("_BANK", "") ?? "-"}`
                                        : sale.pgType === "BANK_TRANSFER"
                                            ? "계좌이체"
                                            : sale.pgType}
                                </div>
                            </td>

                            {/* 금액 */}
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center h-full font-semibold whitespace-nowrap">
                                    ₩{sale.amount.toLocaleString()}
                                </div>
                            </td>

                            {/* 상태 */}
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center h-full">
                                  <span
                                      className={`inline-flex items-center justify-center
                                      whitespace-nowrap
                                      min-w-[64px]
                                      px-3 py-1.5
                                      rounded-full
                                      text-xs font-semibold
                                      ${
                                          sale.payStatus === "PAID"
                                              ? "bg-green-100 text-green-700"
                                              : sale.payStatus === "FAILED"
                                                  ? "bg-red-100 text-red-600"
                                                  : sale.payStatus === "CANCELLED"
                                                      ? "bg-gray-200 text-gray-600"
                                                      : "bg-yellow-100 text-yellow-700"
                                      }`}
                                  >
                                    {sale.payStatus === "PAID" && "결제 완료"}
                                    {sale.payStatus === "FAILED" && "결제 실패"}
                                    {sale.payStatus === "CANCELLED" && "결제 취소"}
                                    {sale.payStatus === "PAY_PENDING" && "결제 대기"}
                                  </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    disabled={pageInfo?.isFirst}
                    onClick={() => setPage(p => p - 1)}
                >
                    이전
                </Button>

                <span className="text-sm py-1">
                  {pageInfo?.currentPage} / {pageInfo?.totalPages}
                </span>

                <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    disabled={pageInfo?.isLast}
                    onClick={() => setPage(p => p + 1)}
                >
                    다음
                </Button>
            </div>
        </div>
    );
}
