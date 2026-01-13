"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { initializeStudentAuthThunk } from "@/store/thunk/studentAuthThunk";
import StudentBackground from "@/components/student/StudentBackground";
import StudentHeader from "@/components/student/StudentHeader";

export default function StudentClientLayout({
                                                children,
                                            }: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(initializeStudentAuthThunk());
    }, [dispatch]);

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            <StudentBackground />
            <StudentHeader />
            <main className="flex-1 relative z-10">{children}</main>
        </div>
    );
}
