import React from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton ';

export interface BasicBoardFormValues {
  title: string;
  content?: string | number | null;
  pinned?: boolean | null;
  files?: File[];
}

interface BasicBoardFormProps {
  mode: 'create' | 'edit';
  defaultValues?: BasicBoardFormValues;
  onSubmit: (values: BasicBoardFormValues) => void;
  isLoading?: boolean;
}

const BasicBoardForm = ({
  mode,
  defaultValues,
  onSubmit,
  isLoading = false,
}: BasicBoardFormProps) => {

  const {
    // useForm() 에 반환되는 객체의 속성들 .. 
    register, // input, textarea 등 폼에 등록할 때 사용 (예: register('title) 이걸 쓰면 해당 필드의 값이 form에 자동으로 포함)
    handleSubmit, // onSubmit을 처리할 때 사용하는 함수 
    setValue, // 특정 필드의 값을 수동으로 설정할때 사용 (예: setValue('title', '수정할 제목'))
    watch, // 특정 필드의 현재 값을 실시간으로 관찰.
    formState: { errors }, // 각 필드의 에러 상태를 저장하는 객체  (errors.title?.message)
  } = useForm<BasicBoardFormValues>(
    {defaultValues: defaultValues || { title: '', content: '', pinned: false, files:[]}
    })
  
  const submitHandler = (values: BasicBoardFormValues) => {
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <input
          type="text"
          {...register('title', { required: '제목은 필수입니다.' })}
          placeholder="제목을 입력하세요"
          className="w-full border rounded p-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <textarea
          {...register('content', { required: '내용을 입력하세요' })}
          placeholder="내용을 입력하세요"
          className="w-full border rounded p-2 h-40"
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>

      <div className="flex justify-end">
        <CustomButton type="submit" loading={isLoading}>
          {mode === 'create' ? '등록' : '수정'}
        </CustomButton>
      </div>
    </form>
  );
};

export default BasicBoardForm;