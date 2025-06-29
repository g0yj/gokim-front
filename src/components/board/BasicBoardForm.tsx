import React, {  useRef } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton ';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


export interface BasicBoardFormValues {
  title?: string | null;
  content?: string | null;
  pinned?: boolean | null;
  files?: File[];
}

export interface EditBoardFormValues extends BasicBoardFormValues {
  deleteFileIds?: string[] | number[] | null;
}

interface BasicBoardFormProps<T extends BasicBoardFormValues> { 
  mode: 'create' | 'edit';
  defaultValues?: T;
  onSubmit: (values: T) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BasicBoardForm = <T extends BasicBoardFormValues> ({ // 타입에 <T>가 있다면 <T,> 반드시 써줘야함. 현재는 제네릭 쓴 곳이 없음.
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}:  BasicBoardFormProps<T>) => {
  const editorRef = useRef<ToastEditor>(null); //Toast UI Editor 조작을 위한 ref 생성

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicBoardFormValues>({
    defaultValues: defaultValues || { title: '', content: '', pinned: false, files: [] },
  });

  const submitHandler = (values: BasicBoardFormValues) => {
    // 에디터 인스턴스에서 HTML 형태로 본문 추출
    const editorInstance = editorRef.current;
    if (editorInstance) {
      const htmlContent = editorInstance.getInstance().getHTML();
      values.content = htmlContent;
    }
    onSubmit(values);
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