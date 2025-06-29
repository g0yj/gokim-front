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
      formData.append('title', formValues.title);
      formData.append('content', formValues.content ?? '');
      
      // ✅ FileList → File[] 로 변환 후 처리
      const files = Array.from(formValues.files || []);
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