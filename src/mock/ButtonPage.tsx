import React from 'react';
import CustomButton from '../components/common/CustomButton ';

/**
 * 버튼 디자인 확인용 
 * @returns 
 */
const ButtonPage = () => {
    const variants = ['primary', 'secondary', 'danger', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
  
    return (
      <div className="p-4 space-y-10">
        {variants.map((variant) => (
          <div key={variant} className="space-y-4">
            <h2 className="font-bold text-lg">Variant: {variant}</h2>
  
            <div className="flex gap-4 flex-wrap">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center">
                  {/* font-bold 제거 → CustomButton 내부 기본값으로 처리 */}
                  <CustomButton variant={variant} size={size}>
                    {variant} / {size}
                  </CustomButton>
                  <p className="text-xs mt-1 text-gray-500">{size} 사이즈</p>
                </div>
              ))}
            </div>
  
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">- Loading 상태</p>
              <CustomButton variant={variant} size="md" loading>
                로딩 중...
              </CustomButton>
            </div>
  
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">- Disabled 상태</p>
              <CustomButton variant={variant} size="md" disabled>
                비활성 버튼
              </CustomButton>
            </div>
  
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">- Ellipsis 상태 (길고 긴 텍스트)</p>
              <div className="w-40">
                <CustomButton variant={variant} size="md" ellipsis>
                  아주 길고 긴 텍스트가 여기에 들어갑니다아아아아아아아아
                </CustomButton>
              </div>
            </div>
  
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">- Full Width</p>
              <CustomButton variant={variant} size="md" className="w-full">
                전체 너비 버튼
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ButtonPage;
