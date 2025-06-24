import log from '@/lib/logger';
import AnonBoardService from '@/services/anonBoardService';
import { AnonBoardDetail } from '@/types/anonBoard';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadFileFromUrl } from '@/utils/file';
import BasicBoardView from '@/components/board/BasicBoardView';

const AnonBoardDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<AnonBoardDetail | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    log.debug('useEffect 실행')
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
    log.debug('수정버튼 클릭');
  }

  const handleDelete = () => {
    log.debug('삭제버튼 클릭');
  }

  const handleDownload = () => {
    log.debug('다운로드 버튼 클릭');
    //downloadFileFromUrl(data?.files.url);
  
    
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
      onDownload={handleDownload}
      getFileKey={(file) => file.url} // URL이 항상 고유함을 가정
    />
  </div>
  );
};

export default AnonBoardDetailPage;