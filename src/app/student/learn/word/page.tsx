import '../learn.css';
import WordTimeline from './WordTimeline';

export default function LearnPage() {


    return (
        <div className="learn-bg">
                    <section className="learn-card">
                        <WordTimeline />
                    </section>
        </div>
    );
}

// 꽃무늬 채팅배경
//<div className="learn-bg">
//             <div className="chat-frame">
//
//                 {/* SVG 배경 */}
//                 <img
//                     src="/chatFrame.svg"
//                     alt=""
//                     className="frame-bg"
//                 />
//
//                 {/* 프레임 안 실제 UI */}
//                 <div className="chat-content">
//
//                     <WordTimeline />
//                 </div>
//
//             </div>
//         </div>