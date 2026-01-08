export default function SidePanel() {
    return (
        <div className="rounded-2xl bg-white/70 backdrop-blur border border-white p-6 space-y-5">

            {/* 헤더 */}
            <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <div className="text-sm font-semibold text-[#19344e]">
                    지니의 메모
                </div>
            </div>

            {/* 설명 */}
            <div className="text-sm text-gray-600 leading-relaxed">
                지금까지 이런 이야기를 만들고 있어!
            </div>

            {/* 단어 요약 */}
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-50 rounded-full text-sm">🐶 강아지</span>
                <span className="px-3 py-1 bg-green-50 rounded-full text-sm">🌳 공원</span>
                <span className="px-3 py-1 bg-blue-50 rounded-full text-sm">🏃 뛰어놀다</span>
            </div>

            {/* 미리보기 */}
            <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="aspect-square rounded-lg bg-gray-100" />
                <div className="aspect-square rounded-lg bg-gray-100" />
            </div>
        </div>
    );
}
