import React from "react";
import Ripples from "react-ripples";
import '@/styles/button.scss';  // SCSS 파일 import

// 버튼 컴포넌트에 전달할 props 타입 정의
interface ButtonsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ellipsis?: boolean;  // ellipsis 여부
  className?: string;  // 추가 클래스
  style?: React.CSSProperties;  // 스타일 추가
  title?: string;  // 타이틀
  children?: React.ReactNode;  // 버튼 내부에 렌더링되는 내용 (선택적)
}

// forwardRef로 ref를 전달받을 수 있도록 수정
const Buttons = React.forwardRef<HTMLButtonElement, ButtonsProps>((props, ref) => {
  return (
    <Ripples className={props.ellipsis ? "max-full" : ""}>
      <button
        ref={ref} // ref 전달
        className={`ui-button ${props.className ? props.className : ""}`}
        onClick={props.onClick}
        type={props.type}
        style={props.style}
        title={props.title}
      >
        {props.children}  {/* children을 렌더링 */}
      </button>
    </Ripples>
  );
});

// 컴포넌트 이름 설정
Buttons.displayName = "Buttons";

export default Buttons;
