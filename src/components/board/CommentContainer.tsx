import log from "@/lib/logger";
import CommunityService from "@/services/communityService";
import { CommentItem } from "@/types/common/comment";
import React, { useEffect, useState } from "react";
import CommentWithReplies from "./CommentWithReplies";
import BasicCommentCreateForm from "./BasicCommentCreateForm";

interface CommentContainerProps {
  comments: CommentItem[];
  onCreateComment: (commentData: { comment: string; isSecret: boolean }) => Promise<void>;
  onModifyComment: (id: string | number) => void;
  onDeleteComment: (id: string | number) => void;
  onCreateReply?: (parentId: string | number | null, content: string) => void | undefined;
  onModifyReply?: (id: string | number) => void;
  onDeleteReply?: (id: string | number) => void;
}

const noop = () => {}; // 빈 함수 정의

const CommentContainer: React.FC<CommentContainerProps> = ({
  comments,
  onCreateComment,
  onModifyComment,
  onDeleteComment,
  onCreateReply = noop, // 기본값 설정 (선택적(`?`)으로 정의되어 있으므로, `undefined`일 가능성을 처리)
  onModifyReply = noop,
  onDeleteReply = noop,
}) => {
    const [createComment, setCreateComment] = useState({ comment: '', isSecret: false });

    /** 댓글 입력 변화 감지해서 댓글 내용 업데이트 */
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreateComment((prev) => ({
            ...prev,
            comment: e.target.value,
        }));
    };

    /** 공개글/비밀글 아이콘 감지 */
    const handleToggleSecret = () => {
        setCreateComment((prev) => ({
            ...prev,
            isSecret: !prev.isSecret,
        }));
    }

    /** 댓글 등록 */
  const handleSubmitComment = async () => {
    await onCreateComment(createComment);
    setCreateComment({ comment: '', isSecret: false });
  };

  const handleReplyCreation = (parentId: string | number | null, content: { comment: string; isSecret: boolean }) => {
    if (onCreateReply) {
      onCreateReply(parentId, content);  // 안전한 호출
    }
  };


  return (
    <div>
      <BasicCommentCreateForm
        comment={createComment.comment}
        isSecret={createComment.isSecret}
        onCommentChange={handleCommentChange}
        onToggleSecret={handleToggleSecret}
        onSubmit={handleSubmitComment}
      />
      {comments.map(comment => (
        <CommentWithReplies
          key={comment.id}
          comment={comment}
          onModifyComment={onModifyComment}
          onDeleteComment={onDeleteComment}
          onCreateReply={onCreateReply}
          onModifyReply={onModifyReply}
          onDeleteReply={onDeleteReply}
        />
      ))}
    </div>
  );
};

export default CommentContainer;