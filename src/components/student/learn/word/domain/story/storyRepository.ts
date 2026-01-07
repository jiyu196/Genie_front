// /domain/story/storyRepository.ts
// 컷 저장소

const KEY = "storyDraft";

export const storyRepository = {
    save(data: any) {
        sessionStorage.setItem(KEY, JSON.stringify(data));
    },

    load() {
        const raw = sessionStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    },

    clear() {
        sessionStorage.removeItem(KEY);
    },
};
