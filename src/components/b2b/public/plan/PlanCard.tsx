import Button from "@/components/b2b/Button";

type Product = {
    id: string;
    displayName: string;
    description?: string;
    price: number;
    duration: number;
    maxPromptDailyCount: number;
    maxWebtoonStorage: number;
    maxServiceAccessIdCount: number;
    productGrade: "BASIC" | "PRO" | "PREMIUM";
    subscriptionCycle: "MONTHLY" | "YEARLY";
};

export default function PlanCard({
                                     product,
                                     onSubscribe,
                                     highlight = false,
                                 }: {
    product: Product;
    onSubscribe?: () => void;
    highlight?: boolean;
}) {
    return (
        <div className="rounded-3xl p-10 bg-white border border-[#dbe1f1] flex flex-col h-full">
            {/* Badge */}
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-[#eef2ff] text-[#19344e]">
    {product.productGrade} PLAN
  </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#19344e] mb-2">
                {product.displayName}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-8 min-h-[48px]">
                {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 my-8 text-sm text-gray-700">
                <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    프롬프트 {product.maxPromptDailyCount}회/일
                </li>
                <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    저장 용량 {product.maxWebtoonStorage}GB
                </li>
                <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    서비스 키 {product.maxServiceAccessIdCount}개
                </li>
                <li className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    구독 기간 {product.duration}일
                </li>
            </ul>

            {/* Footer */}
            <div className="mt-auto">
                <div className="text-2xl font-bold text-[#19344e] mb-6">
                    ₩{product.price.toLocaleString()}
                </div>

                <Button
                    className="w-full hover:brightness-130"
                    onClick={onSubscribe}
                    variant="primary"
                >
                    구독하기
                </Button>
            </div>
        </div>

    );
}