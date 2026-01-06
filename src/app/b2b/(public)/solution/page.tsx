// app/b2b/solution/page.tsx
import Image from "next/image";
import HeroSection from "@/components/b2b/public/solution/HeroSection";
import SolutionInfo from "@/components/b2b/public/solution/SolutionInfo";

export default function SolutionPage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <SolutionInfo/>
        </div>
    );
}
