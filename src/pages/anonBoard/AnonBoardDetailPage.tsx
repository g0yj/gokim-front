import log from '@/lib/logger';
import AnonBoardService from '@/services/anonBoardService';
import { AnonBoardDetail } from '@/types/anonBoard';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicBoardView from '@/components/board/BasicBoardView';
import { BasicBoardFormValues } from '@/components/board/BasicBoardForm';

const AnonBoardDetailPage = () => {
  const { id } = useParams();
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

  const handleEdit = () => {
    log.debug('에디터 모드 전환!'); 
    setIsEditMode(true);
  }
  
  const handleCancelEdit = async () => {
    log.debug('취소 버튼 클릭. 에디터에서 벗어나기');
    setIsEditMode(false);
  }

  const handleDelete = async () => {
    log.debug('삭제버튼 클릭');
    if (!id) return;
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      await AnonBoardService.deleteAnonBoard(id);
      navigate('/anon');
    } catch (err) {
      log.error('axios 호출 실패', err);
    }

  }

  const handleUpdate = async (formValues : BasicBoardFormValues) => {
    log.debug('수정버튼 클릭');

  }

  return (
    <div className="w-[800px] mt-8 mx-auto">
    <BasicBoardView
      title={data?.title}
      content={data?.content}
      files={data?.files}
      isMine={data?.isMine}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCancel={()=> {navigate('/anon')}}
      getFileKey={(file) => file.url} // URL이 항상 고유함을 가정
    />
  </div>
  );
};

export default AnonBoardDetailPage;