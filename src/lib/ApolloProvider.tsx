"use client";

import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/lib/apolloClient";
import {ReactNode} from "react";

export default function ApolloClientProvider({
    children,
                                             }: {
    children: React.ReactNode;
}) {
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}