import React, {  useRef } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton ';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


// 폼 타입 정의
export interface BasicBoardFormValues {
  title?: string | null;
  content?: string | null;
  pinned?: boolean | null;
  files?: File[];
}

export interface EditBoardFormValues extends BasicBoardFormValues {
  deleteFileIds?: (string | number)[] | null;
}

type FormValues = BasicBoardFormValues | EditBoardFormValues;

interface BasicBoardFormProps {
  mode: 'create' | 'edit';
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BasicBoardForm = ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: BasicBoardFormProps) => {
  const editorRef = useRef<ToastEditor>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? {
      title: '',
      content: '',
      pinned: false,
      files: [],
      ...(mode === 'edit' ? { deleteFileIds: [] } : {}),
    },
  });

  const submitHandler = (values: FormValues) => {
    const editorInstance = editorRef.current;
    const htmlContent = editorInstance?.getInstance().getHTML() || '';

    onSubmit({
      ...values,
      content: htmlContent,
    });
  };


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

      {/* Toast UI 에디터 */}
      <div>
        <ToastEditor
          ref={editorRef}
          initialValue={defaultValues?.content || ''}  // 초기 본문 (수정 시)
          previewStyle="vertical"                     // 미리보기: 에디터 아래에 표시
          height="400px"
          initialEditType="wysiwyg"                   // WYSIWYG 모드 고정
          hideModeSwitch={true}                       // Markdown ↔ WYSIWYG 전환 비활성화
          useCommandShortcut={true}                   // 단축키 사용 가능
          toolbarItems={[                             // 툴바 구성
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'link', 'image'],
            ['code', 'codeblock'],
          ]}
        />
      </div>

      {/* 파일 업로드 */}
      <div>
        <input
          type="file"
          multiple
          {...register('files')}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 제출 버튼 및 취소 */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <CustomButton type="button" onClick={onCancel} variant="secondary">
            취소
          </CustomButton>
        )}
        <CustomButton  type="submit" loading={isLoading}>
          {mode === 'create' ? '등록' : '수정'}
        </CustomButton>
      </div>
    </form>
  );
};

export default BasicBoardForm;