import { BasicBoardViewProps } from '@/types/common/board';
import React from 'react';
import CustomButton from '../common/CustomButton ';
import { downloadFileFromUrl } from '@/utils/file';
import { Download } from 'lucide-react';


// <T extends { url: string; originalFileName: string }> 
// 이 부분은 타입 안정성과 컴파일러 자동완성을 위한 제네릭 제약 조건 (자세한 내용은 하단에 정리)
const BasicBoardView = <T extends { url: string; originalFileName: string }> ({
  title,
  content,
  isMine = false,
  files = [],
  getFileKey,
  onEdit,
  onDelete,
}: BasicBoardViewProps<T>) => {

  return (
    <div className="w-[800px] mx-auto mt-8 space-y-6">
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
                  onClick={() =>
                    downloadFileFromUrl(file.url, file.originalFileName)
                  }
                >
                  {file.originalFileName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 내용 */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content ?? '' }} //'' 사용하는 이유? __html 쓸 때 null 값이 나오면 안되기 때문에 기본값 추가해서 null 방지 
      />

      {/* 작성자일 때만 수정/삭제 버튼 */}
      {isMine && (
        <div className="flex justify-end gap-2 mt-6">
          <CustomButton onClick={onEdit}>수정</CustomButton>
          <CustomButton onClick={onDelete} variant="danger">
            삭제
          </CustomButton>
        </div>
      )}
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