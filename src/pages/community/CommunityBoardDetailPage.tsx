import BasicBoardForm from '@/components/board/BasicBoardForm';
import BasicBoardView from '@/components/board/BasicBoardView';
import log from '@/lib/logger';
import CommunityService from '@/services/communityService';
import { BoardFile } from '@/types/common/board';
import { CommunityBoardDetail, CommunityBoardFile } from '@/types/community';
import { Content } from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const CommunityBoardDetailPage = () => {
  const {boardId} = useParams();
  const navigate = useNavigate();
  const {state} = useLocation(); // navigate로 전달할때 조건 추가하는 방법 있었는데 그거 사용하기 위해 필요
  const communityId = state?.propId; // navigate로 전달된 propId 

  const [data, setData] = useState<CommunityBoardDetail | null> (null);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(()=> {
    log.debug('useEffect 실행');
    log.debug('param으로 가져온 게시판 식별키', boardId);
    log.debug('navigate에서 전달받은 propId 확인 ', communityId);

    const fetchData = async () => {
      try {
        if(!boardId) return; 
        const res = await CommunityService.boardDetail(boardId);
        log.info(res);
        setData(res);
      } catch (err) {
        log.error('커뮤니티 게시글 상세조회 axios 실패', err);
      }
    }
    fetchData();
  },[boardId])

  const handleEdit = () =>{
    log.debug('에디터 모드 전환!')
    setIsEditMode(true);
  }

  const handleCancelEdit = async () => {
    log.debug('에디터 모드 벗어나기');
    setIsEditMode(false);
  }

  const handleDelete = async () => {
    log.debug('삭제 버튼 클릭');
    if(!boardId) return;
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    try{
      log.debug('삭제 시도 api 연결 직전')

    } catch (err) {
      log.error('커뮤니티 게시판 삭제 axios 실패', err);
    }

  }

  const handleUpdate = async () => {
    log.debug('수정 버튼 클릭');

  }
  return (
    <div className="w-[800px] mt-8 mx-auto">
      { data ? (
        isEditMode ? (
          <BasicBoardForm
            mode='edit'
            defaultValues={{
              title: data.title,
              content: data.content ?? '',
              files: data.files,
            }}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            getFileId={(file)=> {
              return file.boardFileId;
            }}
          />
        ):(
        <BasicBoardView
          title={data.title}
          content={data.content}
          files={data.files}
          isMine={data.isMine!}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCancel={() => navigate('/community/board')}
          getFileKey={(file)=> file.url}
          />
        )
      ):(
        <p className='text-center text-gray-500'>로딩 중...</p>
      )}
    </div>
  );
};

export default CommunityBoardDetailPage;