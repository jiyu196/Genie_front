import{gql} from "@apollo/client";

export const CHECK_PAYMENT = gql`
mutation checkPayment($input: PaymentCheckRequestDTO!) {
  checkPayment(input: $input) {
    orderUuid
    displayName
    amount
    payStatus
    issuedAccessCount
    message
    paidAt
  }
}
`;