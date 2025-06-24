import { BasicBoardViewProps } from '@/types/common/board';
import React from 'react';
import CustomButton from '../common/CustomButton ';


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
  onDownload
}: BasicBoardViewProps<T>) => {
  return (
    <div className="w-[800px] mx-auto mt-8 space-y-6">
      {/* 제목 */}
      <h2 className="text-2xl font-bold border-b pb-2">{title}</h2>

      {/* 내용 */}
      <div className="text-gray-800 whitespace-pre-line border-b pb-4">
        {content}
      </div>

      {/* 첨부파일 */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-600">첨부파일</div>
          <ul className="space-y-1">
            {files.map((file, idx) => (
              <li
                //props로 전달된 getFileKey 함수가 있다면, 그 함수를 실행해서 key로 사용
                //getFileKey가 없다면, 기본적으로 file.url을 key로 사용
                key={getFileKey ? getFileKey(file, idx) : file.url}
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => onDownload?.(file)}
              >
                {file.originalFileName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 작성자 전용 버튼 */}
      {isMine && (
        <div className="flex gap-2 justify-end pt-4">
          <CustomButton variant="ghost" onClick={onEdit}>
            수정
          </CustomButton>
          <CustomButton variant="danger" onClick={onDelete}>
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