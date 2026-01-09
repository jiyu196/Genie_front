export default function AccessDeniedPage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center space-y-3">
                <h1 className="text-2xl font-bold">접근할 수 없어요</h1>
                <p className="text-gray-500">
                    권한 또는 구독 상태를 확인해주세요.
                </p>
            </div>
        </div>
    );
}
