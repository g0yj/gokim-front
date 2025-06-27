import React from "react";
import ReactModal from "react-modal"; // npm 설치 필요

export interface CustomModalProps extends ReactModal.Props{
   size?: 'sm' | 'md' | 'lg';
   variant?: 'basic' | 'info' | 'warning';
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-xl',
};

const variantMap = {
  basic: 'bg-white text-black',
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
};

const CustomModal = React.forwardRef<HTMLDivElement, CustomModalProps>(
  ({ size = 'md', variant = 'basic', children, ...rest }, ref) => {
    const sizeClass = sizeMap[size];
    const variantClass = variantMap[variant];

    const composedClassName = `rounded p-4 ${sizeClass} ${variantClass}`;

    return (
      <ReactModal
        {...rest}
        className={{
          base: composedClassName,
          afterOpen: 'opacity-100',
          beforeClose: 'opacity-0',
        }}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div ref={ref}>
          {children}
        </div>
      </ReactModal>
    );
  }
);

export default CustomModal;