import log from "@/lib/logger";
import CommunityService from "@/services/communityService";
import {  CreateCommunityBoardComment, ListCommunityBoardComment } from "@/types/community";
import React, { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton ";
import BasicCommentCreateForm from "../board/BasicCommentCreateForm";
import { create } from "domain";

type CommunityBoardCommentProps = {
    boardId: string;
}
const CommunityBoardComment = ({ boardId }: CommunityBoardCommentProps) => {
    log.debug("커뮤니티 게시판 댓글 컴포넌트 실행");
    
    // 댓글 목록 조회에 사용
    const [data, setData] = useState<ListCommunityBoardComment>([]);
    // 댓글 등록에 사용
    const [createComment, setCreateComment] = useState<CreateCommunityBoardComment>({
        comment:"",
        isSecret:false
    });

    /**  댓글 목록 조회 */
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

    /** 댓글 입력 변화 감지해서 댓글 내용 업데이트 */ 
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setCreateComment((prev) => ({
          ...prev,
          comment: e.target.value,
        }));
    };

    /** 공개/비밀 변환 감지 */
    const handleToggleSecret = () => {
      setCreateComment((prev) => ({
        ...prev,
        isSecret: !prev.isSecret,
      }));
    }

    /** 댓글 등록 */ 
    const handleCreateComment = async() => {
        try{
            const res = await CommunityService.createComment(boardId, createComment);
            // 초기화
            setCreateComment({
              comment:"",
              isSecret: false
            })

        } catch (err) {
            log.error("댓글 등록 axios 실패", err);
        }
    }


    useEffect(() => {
        log.debug('커뮤니티 게시판 댓글 useEffect 실행');
        handleListComment(boardId);
    }, [boardId]);

    return (
    <div className="w-full">
      <BasicCommentCreateForm
      comment={createComment.comment}
      isSecret={createComment.isSecret}
      onCommentChange={handleCommentChange}
      onToggleSecret={handleToggleSecret}
      onSubmit={handleCreateComment}
      
      />
      {/* 댓글 목록 */}
      <div className="space-y-2">
        {data.map((commentItem) => (
          <div key={commentItem.id} className="border p-2 w-full">
            {commentItem.comment}
          </div>
        ))}
      </div>
    </div>
    )
}

export default CommunityBoardComment;