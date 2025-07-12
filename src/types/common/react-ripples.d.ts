/**
 * react-ripples.d.ts처럼 .d.ts 확장자를 쓰는 이유는 **"이 파일이 타입 정의 전용임을 TypeScript에게 명시적으로 알려주는 역할
 * Declaration File — 타입 정의만 있음 (실제 구현은 없음)
 *
    < 반드시 사용해야할 때 >
    외부 라이브러리 타입을 직접 선언할 때 (declare module '...')   
    JS-only 라이브러리를 TS에서 쓰고 싶을 때
    타입만 따로 추출해서 공유하고 싶을 때 (라이브러리 제작자 입장)
 */
declare module "react-ripples" {
  import { ComponentType, HTMLAttributes, ReactNode } from "react";

  interface RipplesProps extends HTMLAttributes<HTMLDivElement> {
    during?: number; // animation duration (ms)
    color?: string; // ripple color
    children?: ReactNode; // nested elements
  }

  const Ripples: ComponentType<RipplesProps>;

  export default Ripples;
}
