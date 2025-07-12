import BasicBoardForm, { BasicBoardFormValues } from '@/components/board/BasicBoardForm';
import log from '@/lib/logger';
import CommunityService from '@/services/communityService';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CommunityBoardCreatePage = () => {
  const {id} = useParams(); // 커뮤니티 식별키
  const navigate = useNavigate();

  const handleCreate = async (formValues: BasicBoardFormValues) => {
    try {
      // 전달 데이터 만들기
      const formData = new FormData();
      formData.append('title', formValues.title ?? '');
      formData.append('content', formValues.content ?? '');

      let files: File[] = [];
      // files이 존재할 때만 처리
      if(formValues.files){
        if(formValues.files instanceof FileList) {
          files = Array.from(formValues.files);
        }
        else if (Array.isArray(formValues.files)){
          files = formValues.files.filter((file): file is File => file instanceof File);
        }
      }

      files.forEach(file => formData.append('files', file));

      await CommunityService.createCommunityBoard(formData, id??'');

      navigate(`/community/${id}`);

    } catch (err) {
      log.error('커뮤니티 게시판 등록 axios 실패', err);
    }
  }
  return (
      <div className="w-[800px] mx-auto mt-10">
          <h2 className="text-xl font-bold mb-4">게시글 등록</h2>
          <BasicBoardForm mode='create' onSubmit={handleCreate} onCancel={()=> {navigate(`/community/${id}`)}} />
      
    </div>
  );
};

export default CommunityBoardCreatePage;