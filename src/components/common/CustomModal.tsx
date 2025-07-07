import classNames from "classnames";
import React from "react";
import ReactModal from "react-modal"; // npm i react-modal / npm i @types/react-modal

export interface CustomModalProps extends ReactModal.Props{
   size?: 'sm' | 'md' | 'lg' | 'mail';
   variant?: 'basic' | 'info' | 'warning';
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-xl',
  mail: 'w-[500px] h-[300px]'
};

const variantMap = {
  basic: 'bg-white text-black',
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
};

const CustomModal = React.forwardRef<HTMLDivElement, CustomModalProps>(
  ({ size = 'md', variant = 'basic', children, ...rest }, ref) => {
    const baseClass = 'rounded p-4 transition duration-150';
    const sizeClass = sizeMap[size];
    const variantClass = variantMap[variant];

    const composedClassName = classNames(baseClass, sizeClass, variantClass);

    return (
      <ReactModal
        {...rest}
        className={`content-center ${composedClassName}`}
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