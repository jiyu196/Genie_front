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

        // ====== 스타일 값 ======
        const cutSize = 600;     // 각 컷 크기
        const gap = 24;          // 컷 사이 간격
        const padding = 32;      // 바깥 여백
        const borderWidth = 8;   // 흰색 테두리 두께
        // =====================

        // 컷 수에 따른 레이아웃
        let cols = 2;
        let rows = 2;

        if (count === 1) {
            cols = 1;
            rows = 1;
        } else if (count === 2) {
            cols = 2;
            rows = 1;
        }

        // 캔버스 크기 계산
        canvas.width =
            padding * 2 +
            cols * cutSize +
            (cols - 1) * gap;

        canvas.height =
            padding * 2 +
            rows * cutSize +
            (rows - 1) * gap;

        // 전체 배경 (연한 회색 → 흰 테두리 더 잘 보이게)
        ctx.fillStyle = "#f4f4f6";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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
            const col = index % cols;
            const row = Math.floor(index / cols);

            const x =
                padding + col * (cutSize + gap);
            const y =
                padding + row * (cutSize + gap);

            // 흰색 테두리 (바깥 프레임)
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
                x - borderWidth,
                y - borderWidth,
                cutSize + borderWidth * 2,
                cutSize + borderWidth * 2
            );

            // 이미지
            ctx.drawImage(
                img,
                x,
                y,
                cutSize,
                cutSize
            );
        });

        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return { downloadCombinedImage };
}
