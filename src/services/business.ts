export async function checkBusiness(data: {
    bizNumber: string;
    representativeName: string;
    openingDate: string;
}) {
    const res = await fetch("/api/rest/business/validate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(!res.ok) {
        throw new Error("사업자 조회 요청에 실패했습니다");
    }
    return res.json();
}

