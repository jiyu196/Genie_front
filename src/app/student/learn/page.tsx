import './learn.css';
import ChatTimeline from './_components/ChatTimeline';

export default function LearnPage() {
    return (
        <div className="learn-bg">
                    <section className="learn-card">
                        <ChatTimeline />
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
//                     <ChatTimeline />
//                 </div>
//
//             </div>
//         </div>