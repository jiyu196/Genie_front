"use client";

import StudentBackground from "@/components/student/StudentBackground";
import StudentHeader from "@/components/student/StudentHeader";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {useEffect} from "react";
import {studentInitThunk} from "@/store/thunk/studentInitThunk";

export default function StudentClientLayout({
                                                children,
                                            }: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(studentInitThunk());
    }, [dispatch]);
    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            <StudentBackground />
            <StudentHeader />
            <main className="flex-1 relative z-10">{children}</main>
        </div>
    );
}
