import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton ';
import 'react-quill/dist/quill.snow.css'; //에디터가 스타일 없이 깨져 보이는 문제 해결

// ✅ ReactQuill은 SSR 환경에서 직접 import하면 안 됨!
const ReactQuill = React.lazy(() => import('react-quill'));

export interface BasicBoardFormValues {
  title: string;
  content?: string;
  pinned?: boolean | null;
  files?: File[];
}

interface BasicBoardFormProps {
  mode: 'create' | 'edit';
  defaultValues?: BasicBoardFormValues;
  onSubmit: (values: BasicBoardFormValues) => void;
  isLoading?: boolean;
}

// ✅ Quill 모듈 설정: 글자색 / 배경색 추가
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }], // ✅ 색상 설정
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};


const BasicBoardForm = ({
  mode,
  defaultValues,
  onSubmit,
  isLoading = false,
}: BasicBoardFormProps) => {
  
  // Vite는 CSR(Client Side Rendering)이라 대부분 문제 없지만, 
  // ReactQuill 내부에서 window 관련 오류가 발생할 수 있음 → useEffect로 렌더링 시점을 늦춰줌
  const [isClient, setIsClient] = useState(false);
  const quilRef = useRef(null); // 사용 안했을때 경고 문구 나와서 추가.
  
  useEffect(() => {
    setIsClient(true); // 브라우저 환경에서만 렌더링
  }, []);

//=====================================================================================
  const {
    // useForm() 에 반환되는 객체의 속성들 .. 
    register, // input, textarea 등 폼에 등록할 때 사용 (예: register('title) 이걸 쓰면 해당 필드의 값이 form에 자동으로 포함)
    handleSubmit, // form validation 처리와 함께 우리가 정의한 함수 실행을 연결
    setValue, // 특정 필드의 값을 수동으로 설정할때 사용 (예: setValue('title', '수정할 제목'))
    watch, // 특정 필드의 현재 값을 실시간으로 관찰.
    control, // useForm에서 control 꺼냄 (에디터에 필요)
    formState: { errors }, // 각 필드의 에러 상태를 저장하는 객체  (errors.title?.message)
  } = useForm<BasicBoardFormValues>(
    {defaultValues: defaultValues || { title: '', content: '', pinned: false, files:[]}
    })
  
//====================================================================================
  const submitHandler = (values: BasicBoardFormValues) => {
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* 제목 입력 */}
      <div>
        <input
          type="text"
          {...register('title', { required: '제목은 필수입니다.' })}
          placeholder="제목을 입력하세요"
          className="w-full border rounded p-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* ✅ 에디터 (ReactQuill) 추가 */}
      <div>
        {isClient && (
          <Controller
            name="content"
            control={control}
            rules={{ required: '내용을 입력하세요' }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                className="bg-white"
                placeholder="내용을 입력하세요"
                modules={modules} // ✅ 툴바 모듈 적용
              />
            )}
          />
        )}
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>

      {/* ✅ 파일 업로드 */}
      <div>
        <input
          type="file"
          multiple
          {...register('files')}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <CustomButton type="submit" loading={isLoading}>
          {mode === 'create' ? '등록' : '수정'}
        </CustomButton>
      </div>
    </form>
  );
};

export default BasicBoardForm;