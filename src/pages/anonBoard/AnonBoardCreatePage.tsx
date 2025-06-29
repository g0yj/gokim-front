import BasicBoardForm, { BasicBoardFormValues } from '@/components/board/BasicBoardForm';
import log from '@/lib/logger';
import AnonBoardService from '@/services/anonBoardService';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnonBoardCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (formValues: BasicBoardFormValues) => {
    try {
      // 전달 데이터 만들기
      const formData = new FormData();
      formData.append('title', formValues.title ?? '');
      formData.append('content', formValues.content ?? '');
      
      let files: File[] = [];

      // formValues.files가 존재할 때만 처리
      if (formValues.files) {
        // FileList인 경우
        if (formValues.files instanceof FileList) {
          files = Array.from(formValues.files); // FileList → File[]
        }
        // File[]인 경우 (필터링으로 File만 추출)
        else if (Array.isArray(formValues.files)) {
          files = formValues.files.filter((file): file is File => file instanceof File);
        }
      }

      files.forEach(file => formData.append('files', file));

      await AnonBoardService.createAnonBoard(formData);

      navigate('/anon');
    } catch (err) {
      log.error('axios 호출 실패', err);
    }
  }
  return (
    <div className="w-[800px] mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">익명 게시판 글쓰기</h2>
      <BasicBoardForm mode='create' onSubmit={handleCreate} onCancel={()=> {navigate('/anon')}} />
    </div>
  );
};

export default AnonBoardCreatePage;