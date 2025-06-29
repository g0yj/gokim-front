import log from '@/lib/logger';
import AnonBoardService from '@/services/anonBoardService';
import { AnonBoardDetail } from '@/types/anonBoard';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicBoardView from '@/components/board/BasicBoardView';
import BasicBoardForm, { EditBoardFormValues } from '@/components/board/BasicBoardForm';

const AnonBoardDetailPage = () => {
  const { id } =  useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<AnonBoardDetail | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // 상세일지 수정일지 판단을 위해 필요


  // 상세 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const res = await AnonBoardService.detail(id);
        log.info(res);
        setData(res);
      } catch (err) {
        log.error('useEffect 호출 실패', err);
      }
    }
    fetchData();
  },[id])

  // 수정 버튼 -> 폼으로 전환
  const handleEdit = () => {
    log.debug('에디터 모드 전환!'); 
    setIsEditMode(true);
  }
  // 취소 버튼 -> 다시 보기 모드
  const handleCancelEdit = async () => {
    log.debug('취소 버튼 클릭. 에디터에서 벗어나기');
    setIsEditMode(false);
  }
  // 삭제
  const handleDelete = async () => {
    if (!id) return;
    const confirmDelete  = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete ) return;
    try {
      await AnonBoardService.deleteAnonBoard(id);
      navigate('/anon');
    } catch (err) {
      log.error('axios 호출 실패', err);
    }
  }

  const handleUpdate = async (formValues : EditBoardFormValues) => {
    log.debug('수정버튼 클릭');
    if (!id) return;
    try {
      const formData = new FormData();
      formData.append('title', formValues.title ?? '');
      formData.append('content', formValues.content ?? '');
      const files = Array.from(formValues.files || []);
      files.forEach(file => formData.append('files', file));

      if (formValues.deleteFileIds && formValues.deleteFileIds.length > 0) {
        formValues.deleteFileIds.forEach((id) => {
          formData.append('deleteFileIds', String(id)); // 👈 하나씩 문자열로 추가
        });
      }

      await AnonBoardService.updateAnonBoard(formData, id);
      setIsEditMode(false);

      // 다시 상세 조회 호출
      const updated = await AnonBoardService.detail(id);
      setData(updated);

    } catch (err) {
      log.error('익명 게시판 수정 axios 실패', err);
    }

  }

  return (
    <div className="w-[800px] mt-8 mx-auto">
  {/* 데이터 로딩 완료 후 렌더링 */}
  {data ? (
    isEditMode ? (
      <BasicBoardForm<EditBoardFormValues>
        mode="edit"
        defaultValues={{
          title: data.title,
          content: data.content,
          files: [], // 새로 추가된 파일만 전달
          deleteFileIds: [], // 삭제 대상 파일 id
        }}
        onSubmit={handleUpdate}
        onCancel={handleCancelEdit}
      />
    ) : (
      <BasicBoardView
        title={data.title}
        content={data.content}
        files={data.files}
        isMine={data.isMine}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCancel={() => navigate('/anon')}
        getFileKey={(file) => file.url}
      />
    )
  ) : (
    <p className="text-center text-gray-500">로딩 중...</p>
  )}
</div>
  );
};

export default AnonBoardDetailPage;