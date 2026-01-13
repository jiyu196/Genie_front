import { gql } from "@apollo/client";

export const GET_MY_WEBTOON = gql`
  query getWebtoonPage($input: WebtoonPageRequestDTO!) {
    getWebtoonPage(input: $input) {
      content{
        webtoonGroupId
        title
        cuts{
          imageUrl
        }
      }
      totalPages
      totalElements
      currentPage
      isFirst
      isLast
    }
  }
`;