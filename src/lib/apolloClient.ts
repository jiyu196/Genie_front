import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, Observable } from "@apollo/client";
import { print } from "graphql";

// 파일 업로드 처리 링크
const uploadLink = new ApolloLink((operation, forward) => {
    return new Observable(observer => {
        const context = operation.getContext();
        const { variables } = operation;

        // variables에서 File 찾기
        let hasFile = false;
        const checkForFile = (obj: any): boolean => {
            if (obj instanceof File) return true;
            if (obj && typeof obj === 'object') {
                return Object.values(obj).some(val => checkForFile(val));
            }
            return false;
        };
        hasFile = checkForFile(variables);

        if (!hasFile) {
            // 파일이 없으면 일반 처리
            return forward(operation).subscribe(observer);
        }

        // FormData 생성
        const formData = new FormData();

        // CRITICAL: File을 null로 변경할 때 input 구조 유지
        const sanitizedVariables = JSON.parse(
            JSON.stringify(variables, (key, value) => {
                if (value instanceof File) {
                    return null; // File은 null로
                }
                return value;
            })
        );

        // operations 추가
        const operations = {
            query: print(operation.query),
            variables: sanitizedVariables,
            operationName: operation.operationName,
        };
        console.log('Operations:', JSON.stringify(operations, null, 2));
        formData.append('operations', JSON.stringify(operations));

        // map 생성 및 파일 추가
        const map: Record<string, string[]> = {};
        let fileIndex = 0;

        const extractFiles = (obj: any, path: string = 'variables'): void => {
            if (obj instanceof File) {
                const mapPath = path;
                map[fileIndex.toString()] = [mapPath];
                formData.append(fileIndex.toString(), obj, obj.name);
                console.log(`File ${fileIndex}: ${mapPath} -> ${obj.name}`); // 디버깅용
                fileIndex++;
                return;
            }

            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                Object.keys(obj).forEach(key => {
                    extractFiles(obj[key], `${path}.${key}`);
                });
            }
        };

        extractFiles(variables);

        console.log('Map:', JSON.stringify(map, null, 2)); // 디버깅용
        formData.append('map', JSON.stringify(map));

        console.log("현재 전송될 헤더 목록:", context.headers);

        if (context.headers && context.headers['Content-Type']) {
            console.warn("경고: Content-Type이 고정되어 있으면 멀티파트 전송이 실패할 수 있습니다!");
        }

        // fetch 요청
        fetch('http://localhost:8080/graphql-upload', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'Apollo-Require-Preflight': 'true',
                ...context.headers,
            }
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error('Response body:', text);
                        throw new Error(`HTTP ${response.status}: ${text}`);
                    });
                }
                return response.json();
            })
            .then(result => {
                observer.next(result);
                observer.complete();
            })
            .catch(error => {
                observer.error(error);
            });
    });
});

const httpLink = new HttpLink({
    uri: "http://localhost:8080/graphql",
    credentials: "include",
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([uploadLink, httpLink]),
    cache: new InMemoryCache(),
});