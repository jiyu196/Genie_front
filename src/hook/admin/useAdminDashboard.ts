import { useApolloClient } from "@apollo/client";
import { GET_ADMIN_MEMBERS } from "@/graphql/admin/members";
import {useEffect, useState} from "react";
import {AdminMember} from "@/types/admin/member";

export function useAdminDashboard() {
    const client = useApolloClient();

    const [loading, setLoading] = useState(true);
    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [recentPending, setRecentPending] = useState<AdminMember[]>([]);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const pendingRes = await client.query({
                    query: GET_ADMIN_MEMBERS,
                    fetchPolicy: "network-only",  // apollo 캐시문제
                    variables: {
                        input: { page: 0, size: 5, condition: {
                                memberSearchType: "ALL",
                                registerStatus: "PENDING",
                            },
                        },
                    },
                });

                const approvedRes = await client.query({
                    query: GET_ADMIN_MEMBERS,
                    fetchPolicy: "network-only",
                    variables: {
                        input: {
                            page: 0, size: 5, condition: {
                                memberSearchType: "ALL",
                                registerStatus: "APPROVED",
                            },
                        },
                    },
                });

                const rejectedRes = await client.query({
                    query: GET_ADMIN_MEMBERS,
                    fetchPolicy: "network-only",
                    variables: {
                        input: { page: 0, size: 5, condition: {
                                memberSearchType: "ALL",
                                registerStatus: "REJECTED",
                            },
                        },
                    },
                });

                setPendingCount(pendingRes.data.getAllMembers.totalElements);
                setApprovedCount(approvedRes.data.getAllMembers.totalElements);
                setRejectedCount(rejectedRes.data.getAllMembers.totalElements);
                setRecentPending(pendingRes.data.getAllMembers.content);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, [client]);

    return {
        loading,
        pendingCount,
        approvedCount,
        rejectedCount,
        recentPending,
    };
}
