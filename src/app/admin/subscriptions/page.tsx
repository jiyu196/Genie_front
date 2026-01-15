"use client";

import {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SALES } from "@/graphql/admin/getAdminSales";
import Button from "@/components/b2b/Button";

type SalesSearchCondition = {
    salesSearchType: "ORDER_ID" | "ORGANIZATION_NAME" | null;
    keyword: string | null;
    payStatus: "PAID" | "FAILED" | "CANCELLED" | "PAY_PENDING" | null;
    pgType: "CARD" | "BANK_TRANSFER" | null;
    cardCompany: string | null;
    from: string | null;
    to: string | null;
    displayName: string | null;
};

export default function SubscriptionsPage() {

    const [searchCondition, setSearchCondition] = useState<SalesSearchCondition>({
        salesSearchType: null,
        keyword: null,
        payStatus: null,
        pgType: null,
        cardCompany: null,
        from: null,
        to: null,
        displayName: null,
    });

    const [page, setPage] = useState(1);
    const size = 10;

    const { data, loading, error } = useQuery(GET_ALL_SALES, {
        variables: {
            input: {
                page,
                size,
                salesSearchCondition: searchCondition,
            },
        },
        fetchPolicy: "no-cache",
    });

    const pageInfo = data?.getAllSales;
    const sales = pageInfo?.content ?? [];

    useEffect(() => {
        if (!searchCondition.keyword || !searchCondition.keyword.trim()) {
            setSearchCondition(prev => ({
                ...prev,
                keyword: null,
                salesSearchType: null,
            }));
        }
    }, [searchCondition.keyword]);


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

            {/* 검색 및 필터 영역 */}
            <div className="flex flex-wrap gap-3 items-center bg-white border border-gray-200 p-4 rounded-md">
                {/* 검색 타입 선택 */}
                <select
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#19344e]"
                    value={searchCondition.salesSearchType ?? ""}
                    onChange={(e) => {
                        const value = e.target.value || null;
                        setSearchCondition(prev => ({
                            ...prev,
                            salesSearchType: value as SalesSearchCondition["salesSearchType"]
                        }));
                    }}
                >
                    <option value="">검색 조건</option>
                    <option value="ORGANIZATION_NAME">기관명</option>
                    <option value="ORDER_ID">주문번호</option>
                </select>

                {/* 검색어 입력 */}
                <input
                    type="text"
                    placeholder="검색어 입력"
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm w-64 outline-none focus:border-[#19344e]"
                    value={searchCondition.keyword ?? ""}
                    onChange={(e) => {
                        const value = e.target.value || null;
                        setSearchCondition(prev => ({
                            ...prev,
                            keyword: value
                        }));
                    }}
                />

                {/* 기간 설정 (from ~ to) 추가 */}
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#19344e] text-gray-600"
                        value={searchCondition.from ? searchCondition.from.split("T")[0] : ""}
                        onChange={(e) => {
                            const value = e.target.value || null;
                            const formatted = value ?`${value}T00:00:00` : null;
                            setSearchCondition(prev => ({ ...prev, from: formatted }));
                            setPage(1);
                        }}
                    />
                    <span className="text-gray-400">~</span>
                    <input
                        type="date"
                        className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#19344e] text-gray-600"
                        value={searchCondition.to ? searchCondition.to.split("T")[0] : ""}
                        onChange={(e) => {
                            const value = e.target.value || null;
                            const formatted = value ?`${value}T23:59:59` : null;
                            setSearchCondition(prev => ({ ...prev, to: formatted }));
                            setPage(1);
                        }}
                    />
                </div>

                {/* 기간 초기화 버튼 (추가) */}
                <button
                    onClick={() => setSearchCondition(prev => ({ ...prev, from: null, to: null }))}
                    className="text-xs text-gray-400 hover:text-gray-600 underline ml-1 cursor-pointer"
                >
                    날짜 초기화
                </button>
                
                {/* 결제 수단 필터 추가 */}
                <select
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#19344e]"
                    value={searchCondition.pgType ?? ""}
                    onChange={(e) => {
                        const value = e.target.value || null;
                        setSearchCondition(prev => ({
                            ...prev,
                            pgType: value as SalesSearchCondition["pgType"]
                        }));
                        setPage(1);
                    }}
                >
                    <option value="">결제 수단 전체</option>
                    <option value="CARD">카드 결제</option>
                    <option value="BANK_TRANSFER">계좌 이체</option>
                </select>

                <select
                    className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-[#19344e]"
                    value={searchCondition.payStatus ?? ""}
                    onChange={(e) => {
                        const value = e.target.value || null;
                        setSearchCondition(prev => ({
                            ...prev,
                            payStatus: value as SalesSearchCondition["payStatus"]
                        }));
                        setPage(1);
                    }}
                >
                    <option value="">전체 상태</option>
                    <option value="PAID">결제 완료</option>
                    <option value="FAILED">결제 실패</option>
                    <option value="CANCELLED">결제 취소</option>
                    <option value="PAY_PENDING">결제 대기</option>
                </select>
            </div>

            {/* 테이블 */}
            <div className="bg-white border border-gray-200 rounded-md">
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e] text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left w-[22%]">기관명</th>
                        <th className="px-4 py-3 text-left w-[20%]">플랜</th>
                        <th className="px-4 py-3 text-center w-[10%] whitespace-nowrap">결제수단</th>
                        <th className="px-4 py-3 text-center w-[15%]">카드사</th>
                        <th className="px-4 py-3 text-center w-[15%]">금액</th>
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

                            {/* 결제 상태 필터 */}
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
