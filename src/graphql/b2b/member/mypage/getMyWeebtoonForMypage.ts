import { gql } from "@apollo/client";

export const GET_MY_WEBTOON_FOR_MY_PAGE = gql`
  query getWebtoonForMyPage($input: MyPageWebtoonRequestDTO!) {
    getWebtoonForMyPage(input: $input) {
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
      serviceAccessId
    }
  }
`;