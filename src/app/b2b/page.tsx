import B2BHeader from "@/components/common/B2BHeader";
import Banner from "@/components/common/Banner";
import NoticePreview from "@/components/common/NoticePreview";
import LearningEffect from "@/components/common/LearningEffect";
import B2BFooter from "@/components/common/B2BFooter";

export default function B2BPage() {
    return (
        <div className="p-10">
            <Banner />
            <NoticePreview />
            <LearningEffect />
        </div>
    );
}
