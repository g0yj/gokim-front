import log from "@/lib/logger";
import CommunityService from "@/services/communityService";
import {  ListCommunityBoardComment } from "@/types/community";
import React, { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton ";

type CommunityBoardCommentProps = {
    boardId: string;
}
const CommunityBoardComment = ({ boardId }: CommunityBoardCommentProps) => {
    log.debug("커뮤니티 게시판 댓글 컴포넌트 실행");
    
    const [data, setData] = useState<ListCommunityBoardComment>([]);
    const [comment, setComment] = useState("");

    // 댓글 목록 조회
    const handleListComment = async(board: string) => {
        log.debug('조회 메서드 실행');

        try {
            const res = await CommunityService.listComment(boardId);
            log.info(res);
            setData(res);
        } catch (err) {
            log.error('댓글 목록조회 axios 실패' , err);
        }
    }
    // 댓글 입력 변화 감지해서 댓글 내용 업데이트
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setComment(e.target.value);
    }

    const handleCreateComment = async() => {
        log.debug('등록 버튼 클릭');
    }


    useEffect(() => {
        log.debug('커뮤니티 게시판 댓글 useEffect 실행');
        handleListComment(boardId);
    }, [boardId]);

    return (
    <div className="w-full">
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border p-2 mb-2 mr-2 text-sm placeholder-gray-400"
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={handleCommentChange}
          style={{height:'36px'}}
        />
        <CustomButton
          variant="primary"
          size="sm"
          className="h-9 px-3 text-sm whitespace-nowrap"
          onClick={handleCreateComment}
        >
          등록
        </CustomButton>
      </div>
      {/* 댓글 목록 */}
      <div className="space-y-2">
        {data.map((commentItem, index) => (
          <div key={index} className="border p-2 w-full">
            임시댓글
          </div>
        ))}
      </div>
    </div>
    )
}

export default CommunityBoardComment;