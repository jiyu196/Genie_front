import WordTimeline from "@/components/student/learn/word/WordTimeline";
import WordLearnFlow from "@/components/student/learn/word/WordLearnFlow";

export default function LearnPage() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div
                className="
                    mx-auto
                    w-[500px]
                    h-[80vh]
                    min-h-0
                    bg-white
                    rounded-3xl
                    shadow-lg
                    flex
                    flex-col
                    overflow-hidden
                  "
            >
            <WordLearnFlow />
            </div>
        </div>
    );
}
