import { gql } from '@apollo/client';

// 쿼리 정의
export const GET_ALL_SALES = gql`
  query GetAllSales($input: AdminSalesPageRequestDTO) {
    getAllSales(input: $input) {
      content {
        organizationName
        payStatus
        amount
        pgType
        cardCompany
        reason
        displayName
      }
      totalPages
      totalElements
      currentPage
      isFirst
      isLast
    }
  }
`;