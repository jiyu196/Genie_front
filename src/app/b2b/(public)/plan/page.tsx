import HeroSection from "@/components/b2b/public/plan/HeroSection";
import SubscriptionProducts from "@/components/b2b/public/plan/SubscriptionProducts";
import PlanFeatures from "@/components/b2b/public/plan/PlanFeatures";

export default function PlanPage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <SubscriptionProducts />
            <PlanFeatures />
        </div>
    );
}
