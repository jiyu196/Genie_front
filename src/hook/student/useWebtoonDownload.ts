// hooks/useWebtoonDownload.ts
"use client";

// 합쳐진 이미지 다운
export function useWebtoonDownload() {
    const downloadCombinedImage = async (
        imageUrls: string[],
        fileName: string = "my_webtoon.png"
    ) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const count = imageUrls.length;
        const size = 600;

        // 컷 수에 따른 canvas 크기 결정
        let cols = 2;
        let rows = 2;

        if (count === 1) {
            cols = 1;
            rows = 1;
        } else if (count === 2) {
            cols = 2;
            rows = 1;
        } else if (count === 3) {
            cols = 2;
            rows = 2;
        }

        canvas.width = cols * size;
        canvas.height = rows * size;

        const images = await Promise.all(
            imageUrls.map((url) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = url;
                    img.onload = () => resolve(img);
                });
            })
        );

        images.forEach((img, index) => {
            const x = (index % cols) * size;
            const y = Math.floor(index / cols) * size;
            ctx.drawImage(img, x, y, size, size);
        });

        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };


    return { downloadCombinedImage };
}
