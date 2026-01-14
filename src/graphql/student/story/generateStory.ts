import { gql } from "@apollo/client";

// 아이가 입력한 단어 배열을 보내는 mutation

// input (GenerateStoryRequestDTO)
// characterWords: 캐릭터 단어 배열
// stories: 컷 별 장소/행동 단어 배열
// usedTokens: 사용한 입력 토큰 수

export const GENERATE_STORY = gql`
  mutation GenerateStory($input: GenerateStoryRequestDTO!) {
    generateStory(input: $input) {
      originalContent
      refinedContent
      revisedPrompt
      imageUrl
      errorMessage
      promptCount
    }
  }
`;