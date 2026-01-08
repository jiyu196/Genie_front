import {gql} from "@apollo/client"

export const CHECK_BIZ_NUMBER = gql`
    mutation checkBizNumber($input: BusinessValidationCheckRequestDTO!) {
        checkBizNumber(input: $input) {
            bizNumber
            validation
            validationMsg
            businessStatus
            businessStatusCode
        }
    }
`
