import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ApolloProvider} from "@apollo/client";
import ApolloClientProvider from "@/lib/ApolloProvider";



const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "GenieTune",
    description: "AI learning platform",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={`${inter.variable} antialiased`}>
                <ApolloClientProvider>
                    {children}
                </ApolloClientProvider>
            </body>
        </html>
    );
}
