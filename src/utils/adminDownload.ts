// utils/adminDownload.ts
export const adminDownloadByLink = async (url: string, filename?: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include", // 관리자 세션 쿠키 포함
        });

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename ?? "download";
        document.body.appendChild(a);
        a.click();

        a.remove();
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error("Admin download error:", e);
        window.open(url, "_blank");
    }
};
