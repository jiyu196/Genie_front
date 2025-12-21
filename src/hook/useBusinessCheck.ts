// src/hook/useBusinessCheck.ts
import { useState } from "react";

export function useBusinessCheck(
    checkBusinessFn: (input: any) => Promise<any>
) {
    const [state, setState] = useState({
        isChecked: false,
        isVerified: false,
        message: null as string | null,
    });

    const check = async (input: {
        bizNumber: string;
        representativeName: string;
        openingDate: string;
    }) => {
        if (state.isChecked) return;

        setState((prev) => ({
            ...prev,
            isVerified: false,
            message: null,
        }));

        try {
            const res = await checkBusinessFn(input);
            const result = res.data?.checkBizNumber;

            if (!result || !result.businessStatusCode) {
                setState({
                    isChecked: true,
                    isVerified: false,
                    message: "사업자 상태를 확인할 수 없습니다.",
                });
                return;
            }

            if (result.businessStatusCode !== "01") {
                setState({
                    isChecked: true,
                    isVerified: false,
                    message:
                        result.businessStatusCode === "02"
                            ? "휴업 중인 사업자는 가입이 불가합니다."
                            : "폐업된 사업자는 가입이 불가합니다.",
                });
                return;
            }

            setState({
                isChecked: true,
                isVerified: true,
                message: "정상 사업자입니다. 회원가입을 진행해주세요.",
            });
        } catch (e) {
            setState({
                isChecked: true,
                isVerified: false,
                message: "사업자 조회 중 오류가 발생했습니다.",
            });
        }
    };

    return { ...state, check };
}


// hook은 클라이언트랑 서비스 주입