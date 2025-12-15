import '../learn.css';
import WordTimeline from '../word/WordTimeline';
import SentenceTimeline from "@/app/student/learn/sentence/SentenceTimeline";

export default function LearnPage() {


    return (
        <div className="learn-bg">
            <section className="learn-card">
                <SentenceTimeline />
            </section>
        </div>
    );
}