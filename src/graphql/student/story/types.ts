// 백 GraphQL input GenerateStoryRequestDTO

export type GenerateStoryRequestDTO = {
    characterWords: string[];
    stories: StoryWordsRequestDTO[];
    usedTokens: number;
};

export type StoryWordsRequestDTO = {
    words: string[];
};
