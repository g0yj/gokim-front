import BasicBoardForm, { BasicBoardFormValues } from '@/components/board/BasicBoardForm';
import log from '@/lib/logger';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnonBoardCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (formValues: BasicBoardFormValues) => {
    
    log.debug('생성 버튼 클릭!!'); 
  }
  return (
    <div className="w-[800px] mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">익명 게시판 글쓰기</h2>
      <BasicBoardForm mode='create' onSubmit={handleCreate} />
    </div>
  );
};

export default AnonBoardCreatePage;