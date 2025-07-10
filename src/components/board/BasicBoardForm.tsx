import React, {  useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton ';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
//import { AnonBoardFile } from '@/types/anonBoard';
import { getFileName } from '@/utils/file';
import log from '@/lib/logger';
import { BoardFile } from '@/types/common/board';


// 폼 필드 기본 타입 (등록/수정 공통)
export interface BasicBoardFormValues {
  title?: string | null;
  content?: string | null;
  pinned?: boolean | null;
  // File은 폼 데이터로 파일 보낼 때 필수인거임. BoardFile은 상세 조회시 필요한 필드 모아둔 객체
  files?: File[] | BoardFile[] | null;
}

// 수정 전용 타입: 삭제할 파일 id 목록 포함
export interface EditBoardFormValues extends BasicBoardFormValues {
  deleteFileIds?: (string | number)[] | null;
}

// useForm과 submitHandler에서 사용될 통합 타입
type FormValues = BasicBoardFormValues | EditBoardFormValues;

// 공통 게시글 폼 Props 제네릭 정의
interface BasicBoardFormProps {
  mode: 'create' | 'edit';
  defaultValues?: BasicBoardFormValues & { files?: BoardFile [] };
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  deleteFileId?: (fileId: string | number) => void;
}

//===============================================================================
const BasicBoardForm = ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  deleteFileId,
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

  // ✅ 삭제 후 즉시 UI에 반영하기 위한 파일 목록 로컬 상태
  const [localFiles, setLocalFiles] = useState<BoardFile[]>(defaultValues?.files || []);

  // defaultValues가 변경되면 로컬 파일 상태도 동기화
  useEffect(() => {
    if (defaultValues?.files) {
      setLocalFiles(defaultValues.files);
    }
  }, [defaultValues?.files]);


  // --------------------------
  // ✅ 삭제 버튼 클릭 시 호출되는 함수
  // - UI에 즉시 반영 + 상위 컴포넌트로 삭제 ID 전달
  // --------------------------
  const handleDeleteFile = (fileId: string | number | undefined) => {
    log.debug('삭제 아이콘 클릭');
    if (!fileId) return;

    // 1) UI에서 삭제
    setLocalFiles((prev) => prev.filter((file) => file.id !== fileId));

    // 2) 상위 컴포넌트로 삭제할 ID 전달
    if (deleteFileId) {
      log.debug('삭제할 파일 ID:', fileId);
      deleteFileId(fileId);
    }
  };


  const submitHandler = (values: FormValues) => {
    const htmlContent = editorRef.current?.getInstance().getHTML() || '';
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

      {/* 서버에 저장된 기존 파일 목록
          렌더링 시 deleteFileIds에 포함되지 않은 것만 렌더
      */}
      {mode === 'edit' && defaultValues?.files &&
  defaultValues.files.map((file,idx) => (
    <div key={`${file.id}-${idx}`} className="flex justify-between items-center">
      <span>{getFileName(file)}</span>
      <button
        type="button"
        onClick={() => handleDeleteFile(file.id)}
        className="text-red-500 hover:text-red-700"
      >
        ❌
      </button>
    </div>
  ))}

      
      {/* 신규 파일 업로드 */}
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