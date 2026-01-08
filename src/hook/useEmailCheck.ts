import {useMutation} from "@apollo/client";
import {EMAIL_CHECK_MUTATION} from "@/graphql/b2b/auth/checkEmail";

// 이메일 중복 검사
export function useEmailCheck() {
    const [checkEmailMutation, {loading}] = useMutation(EMAIL_CHECK_MUTATION);

    const checkEmail = async (email: string) => {
        try {
            await checkEmailMutation({
                variables: {input: {email}},
            });
            return {exists: false};
        } catch(e: any) {
            if (e?.graphQLErrors?.[0]?.extensions?.code === "EMAIL_DUPLICATED") {
                return {exists: true};
            }
            throw e;
            }
        };
    return {checkEmail, loading};
    }
