/**
 *  .env에 정의한 변수의 타입 정의
 *      -> ex) VITE_API_URL 같은 환경 변수의 타입 인식
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // 추가적인 환경변수 있으면 여기에!!
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
