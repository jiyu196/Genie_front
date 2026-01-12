import {gql} from "@apollo/client";

// login.ts, me.ts 이런 경우에는 서버 상태 변경이라 뮤테이션
// members.ts는 서버 상태 조회라 쿼리
export const GET_ADMIN_MEMBERS = gql `
    query GetAllMembers($input: MemberPageRequest!) {
        getAllMembers(input: $input) {
            content {
                email
                organizationName
                bizNumber
                contactName
                createdAt
                registerStatus
                rejectReason
                businessLicenseUrl
                employmentCertUrl
            }
            totalPages
            totalElements
            currentPage
            isFirst
            isLast
        }
    }
`;