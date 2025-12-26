"use client";

import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { initializeAuthThunk } from "@/store/thunk/authThunk";
import type {AppDispatch, RootState} from "@/store";

export default function InitializeAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        dispatch(initializeAuthThunk());
    }, [dispatch]);

    return null;
}

// 리덕스, 쿠키인증일때 필수로 들어감
// 역할: 앱,웹이 처음 뜰때 쿠키에 로그인 세션이 있는지 한번 확인함