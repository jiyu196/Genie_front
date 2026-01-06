import { gql } from "@apollo/client";

export const PREPARE_ORDER = gql`
  mutation PrepareOrder($input: MakeOrderRequestDTO!) {
    prepareOrder(input: $input) {
      orderUuid
      totalAmount
      storeId
      displayName
      productId
      channelKey
    }
  }
`;
