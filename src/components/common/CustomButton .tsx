import classNames from "classnames";
import React from "react";
import Ripples from "react-ripples";

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  ellipsis?: boolean;
  loading?: boolean;
}

const sizeMap = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
};

const variantMap = {
  primary: "bg-[#161C24] text-white hover:bg-[#0F141B]",
  secondary:
    "bg-[#F4F6F8] text-[#161C24] hover:bg-[#DFE3E8]  border border-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost:
    "bg-transparent text-[#161C24] border border-gray-300 hover:bg-[#F9FAFB]",
};

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      onClick,
      className,
      size = "md",
      variant = "primary",
      ellipsis = false,
      loading = false,
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    // ✅ 공통으로 항상 적용되는 기본 스타일
    const baseClass =
      "rounded transition duration-150 font-bold disabled:opacity-50 disabled:cursor-not-allowed";
    const sizeClass = sizeMap[size];
    const variantClass = variantMap[variant];

    const composedClassName = classNames(
      baseClass,
      sizeClass,
      variantClass,
      className
    );

    return (
      <Ripples className={ellipsis ? "max-w-full" : ""}>
        <button
          ref={ref}
          onClick={onClick}
          className={composedClassName}
          disabled={disabled || loading}
          type={type}
          {...rest}
        >
          {loading ? <span className="animate-pulse">...</span> : children}
        </button>
      </Ripples>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
