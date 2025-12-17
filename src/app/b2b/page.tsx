import B2BHeader from "@/components/b2b/B2BHeader";
import Banner from "@/components/b2b/Banner";
import NoticePreview from "@/components/b2b/NoticePreview";
import LearningEffect from "@/components/b2b/LearningEffect";
import B2BFooter from "@/components/b2b/B2BFooter";

export default function B2BPage() {
    return (
        <div className="p-10">
            <Banner />
            <NoticePreview />
            <LearningEffect />
        </div>
    );
}
