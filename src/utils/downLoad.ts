// utils/download.ts
export const downloadByLink = (url: string, filename?: string) => {
    const a = document.createElement("a");
    a.href = url;
    if (filename) a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
};
