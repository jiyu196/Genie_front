// src/types/webtoon.ts
export type WebtoonCut = {
    imageUrl: string;
};

export type WebtoonGroup = {
    webtoonGroupId: string;
    title: string;
    cuts: WebtoonCut[];
};
