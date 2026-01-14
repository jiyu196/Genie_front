// utils/download.ts
// export const downloadByLink = (url: string, filename?: string) => {
//     const a = document.createElement("a");
//     a.href = url;
//     if (filename) a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
// };

export const downloadByLink = async (url: string, filename?: string) => {
    try {
        // URL 뒤에 타임스탬프를 붙여 브라우저 캐시를 무시합니다.
        const cacheBusterUrl = `${url}${url.includes('?') ? '&' : '?'}t=${new Date().getTime()}`;

        const response = await fetch(cacheBusterUrl);
        if (!response.ok) throw new Error('Download failed');

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename || url.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Download error:', error);
        window.open(url, '_blank');
    }
};