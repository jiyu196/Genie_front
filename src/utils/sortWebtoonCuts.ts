// src/utils/sortWebtoonCuts.ts
export function sortWebtoonCutsInStoryOrder<T>(cuts: T[]): T[] {
    return [...cuts].reverse();
}
