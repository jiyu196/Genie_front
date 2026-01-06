// app/b2b/company/page.tsx
import Image from "next/image";
import HeroSection from "@/components/b2b/public/company/HeroSection";
import IntroSection from "@/components/b2b/public/company/IntroSection";
import TrustSection from "@/components/b2b/public/company/TrustSection";
import ValueSection from "@/components/b2b/public/company/ValueSection";

export default function CompanyPage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <IntroSection/>
            <ValueSection/>
            <TrustSection/>
        </div>
    );
}
