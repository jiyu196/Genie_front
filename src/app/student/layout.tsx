import StudentBackground from "@/components/student/StudentBackground";
import StudentHeader from "@/components/student/StudentHeader";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {initializeStudentAuthThunk} from "@/store/thunk/studentAuthThunk";
import StudentClientLayout from "@/app/student/StudentClientLayout";

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return <StudentClientLayout>{children}</StudentClientLayout>;
}