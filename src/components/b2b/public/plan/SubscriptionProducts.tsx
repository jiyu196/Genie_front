"use client";

import { useState } from "react";
import PlanCard from "@/components/b2b/public/plan/PlanCard";
import OrderConfirmModal from "@/components/b2b/public/plan/OrderConfirmModal";
import {useQuery} from "@apollo/client";
import {GET_ALL_PRODUCTS} from "@/graphql/b2b/plan/products";

type ProductGrade = "BASIC" | "PRO" | "PREMIUM";

export default function SubscriptionProducts() {
    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

    const [selectedGrade, setSelectedGrade] =
        useState<ProductGrade>("BASIC");
    const [selectedProduct, setSelectedProduct] =
        useState<any>(null);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생</div>;

    const products = data.getAllProducts.list;

    const filtered = products.filter(
        (p: any) => p.productGrade === selectedGrade
    );

    const monthly = filtered.find(
        (p: any) => p.subscriptionCycle === "MONTHLY"
    );

    const yearly = filtered.find(
        (p: any) => p.subscriptionCycle === "YEARLY"
    );

    return (
        <>
            <section className="py-24 bg-[#fafbff]">
                <div className="max-w-[960px] mx-auto px-6">

                    <div className="flex justify-center gap-4 mb-10">
                    {(["BASIC", "PRO", "PREMIUM"] as ProductGrade[]).map((grade) => (
                        <button
                            key={grade}
                            onClick={() => setSelectedGrade(grade)}
                            className={`px-6 py-2 rounded-full font-semibold cursor-pointer ${
                                selectedGrade === grade
                                    ? "bg-[#19344e] text-white"
                                    : "bg-gray-100 text-gray-500"
                            }`}
                        >
                            {grade}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {monthly && (
                        <PlanCard
                            product={monthly}
                            onSubscribe={() => setSelectedProduct(monthly)}
                        />
                    )}

                    {yearly && (
                        <PlanCard
                            product={yearly}
                            onSubscribe={() => setSelectedProduct(yearly)}
                        />
                    )}
                </div>
            </div>
        </section>

        {selectedProduct && (
            <OrderConfirmModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        )}
    </>
    );
}