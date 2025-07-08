import React, {  useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton ';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { AnonBoardFile } from '@/types/anonBoard';
import { getFileName } from '@/utils/file';
import log from '@/lib/logger';
import { BoardFile } from '@/types/common/board';


// 폼 필드 기본 타입 (등록/수정 공통)
export interface BasicBoardFormValues {
  title?: string | null;
  content?: string | null;
  pinned?: boolean | null;
  files?: File[] | AnonBoardFile[] | null;
}

// 수정 전용 타입: 삭제할 파일 id 목록 포함
export interface EditBoardFormValues extends BasicBoardFormValues {
  deleteFileIds?: (string | number)[] | null;
}

// useForm과 submitHandler에서 사용될 통합 타입
type FormValues = BasicBoardFormValues | EditBoardFormValues;

// 공통 게시글 폼 Props 제네릭 정의
interface BasicBoardFormProps<T> {
  mode: 'create' | 'edit';
  defaultValues?: BasicBoardFormValues & { files?: (File | T | BoardFile )[] };
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  getFileId?: (file: T) => string | number;
}

//===============================================================================
const BasicBoardForm = <T,> ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  getFileId,
}: BasicBoardFormProps<T>) => {

  const editorRef = useRef<ToastEditor>(null);
  
  // 삭제할 서버 파일 id 저장용
  const [deleteFileIds, setDeletedFileIds] = useState<(string | number)[]>([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? {
      title: '',
      content: '',
      pinned: false,
      files: [],
      ...(mode === 'edit' ? { deleteFileIds: [] } : {}),
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        ...(mode === 'edit' ? { deleteFileIds: [] } : {}),
      });
    }
  }, [defaultValues, reset, mode]);


  const submitHandler = (values: FormValues) => {
    const htmlContent = editorRef.current?.getInstance().getHTML() || '';
    onSubmit({
      ...values,
      content: htmlContent,
      deleteFileIds,
    });
  };
  
  // 전체 파일 중 서버에 저장된 파일만 추림 (File 인스턴스 제외)
  const allFiles = defaultValues?.files ?? [];
  const serverFiles = allFiles
  .filter((f): f is T => !(f instanceof File))
  .filter((file) => {
    if (!getFileId) return true;
    const id = getFileId(file);
    return !deleteFileIds.includes(id); // 삭제 대상은 제외
  });


  // 삭제 버튼 클릭 시 삭제 ID 배열에 추가
  const handleFileDelete = (file: T) => {
    if (!getFileId) return;
    const id = getFileId(file);
    log.debug('파일 삭제', id);
    setDeletedFileIds(prev => [...prev, id]);
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
      {mode === 'edit' && getFileId &&  
        serverFiles
          .filter(file => !deleteFileIds.includes(getFileId(file)))
          .map(file => {
            const fileId = getFileId(file);
            return (
              <div key={fileId} className="flex justify-between items-center">
                <span>{getFileName(file)}</span>
                <button
                  type="button"
                  onClick={() => handleFileDelete(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            );
          })}

      
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