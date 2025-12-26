import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloClientProvider from "@/lib/ApolloProvider";
import InitializeAuth from "@/app/InitializeAuth";
import ReduxProvider from "@/app/ReduxProvider";
import {notoSans} from "@/app/font";
import AuthGate from "@/app/AuthGate";



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
            <body className={`
          ${notoSans.variable}
          font-sans
          bg-background-light text-text-primary-light
          dark:bg-background-dark dark:text-text-primary-dark
        `}>
                        <ReduxProvider>
                            <InitializeAuth/>
                            <AuthGate>
                            <ApolloClientProvider>
                                {children}
                            </ApolloClientProvider>
                            </AuthGate>
                        </ReduxProvider>
            </body>
        </html>
    );
}
