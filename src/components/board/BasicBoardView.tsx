import { BasicBoardViewProps } from '@/types/common/board';
import React from 'react';
import CustomButton from '../common/CustomButton ';
import { downloadFileFromUrl } from '@/utils/file';
import { Download } from 'lucide-react'; // npm 설치 필요(디자인적 요소임)
import { Viewer } from '@toast-ui/react-editor'; // ✅ Toast UI Viewer 컴포넌트 import
// ✅ Toast UI 스타일 파일 반드시 import (Viewer 스타일 포함)
import '@toast-ui/editor/dist/toastui-editor.css'; //  Editor용 
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; //  Viewer용 

const BasicBoardView = <T extends { url: string; originalFileName: string }>({
  title,
  content,
  isMine = false,
  files = [],
  getFileKey,
  onEdit,
  onDelete,
  onCancel,
}: BasicBoardViewProps<T>) => {
  return (
    <div className="w-[800px] mx-auto mt-8 space-y-6">
      {/* 수정/삭제 버튼 (작성자 본인일 때만 표시) */}
      <div className="flex justify-end gap-2 mt-6">
        {isMine ? (
          <>
            <CustomButton onClick={onCancel} variant="secondary">목록</CustomButton>
            <CustomButton onClick={onEdit}>수정</CustomButton>
            <CustomButton onClick={onDelete} variant="danger">삭제</CustomButton>
          </>
        ) : (
          <CustomButton onClick={onCancel}>목록</CustomButton>
        )}
      </div>
      {/* 제목 */}
      <div>
        <h1 className="text-2xl font-semibold break-words">{title}</h1>
      </div>

      {/* 첨부파일 */}
      {files.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">첨부파일</h3>
          <ul className="space-y-2 list-none">
            {files.map((file, idx) => (
              <li
                key={getFileKey ? getFileKey(file, idx) : file.url}
                className="flex items-center gap-2"
              >
                <Download size={16} className="text-gray-500" />
                <button
                  type="button"
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => downloadFileFromUrl(file.url, file.originalFileName)}
                >
                  {file.originalFileName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 본문 */}
      <div>
        {/* 본문 - content가 있을 때만 Viewer 렌더링 . 
          이거 안 넣으면, 새로고침 시 본문 아예 안나옴!
        */}
        {content ? (
          <Viewer key={content} initialValue={content ?? ''} /> //key 속성을 활용해서 Viewer를 강제로 리렌더링 (아래설명)
        ) : (
          <p className="text-gray-500">불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default BasicBoardView;

/**
 * BasicBoardView 컴포넌트는 files를 T[]로 받는다고 했음
 * 그런데 files.map()에서 file.url, file.originalFileName을 직접 접근하니까 
 * 컴파일러는 **“T 타입이 이런 필드를 가진다고 보장할 수 없어”**라고 경고.
 *그래서 아래와 같이 T는 최소한 { url: string; originalFileName: string }는 갖고 있어야 한다고
 * 명시적으로 보장해줄 수 있음.
 * 즉, 공통 컴포넌트로 쓸 때도 BoardFile 또는 상속 구조를 따르기만 하면 문제 없이 사용 가능하다는 뜻
 */

 /**
  * 수정 후 새로고침하지 않으면 content가 반영되지 않는 이유??
  * Toast UI Viewer가 업데이트된 content를 반영하지 않음
    BasicBoardView 컴포넌트 내부의 <Viewer initialValue={content ?? ''} />는 initialValue만 초기 렌더에 사용되고 이후에는 변화해도 갱신되지 않아.

    해결책은? key 속성을 활용해서 Viewer를 강제로 리렌더링해주는 방식이 실무에서 가장 간단
  */