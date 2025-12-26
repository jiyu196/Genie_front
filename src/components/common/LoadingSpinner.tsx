"use client";

export default function FullScreenSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/70">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#19344e] rounded-full animate-spin" />
        </div>
    );
}
