import { CommentItem } from "@/types/common/comment";
import Comment from "./Comment";
import { useState } from "react";
import BasicCommentCreateForm from "./BasicCommentCreateForm";

interface CommentWithRepliesProps {
  comment: CommentItem;
  onModifyComment: (id: string | number, content: { comment: string; isSecret: boolean }) => void;
  onDeleteComment: (id: string | number) => void;
  onCreateReply?: (parentId: string | number | null, content: { comment: string; isSecret: boolean }) => void;
  onModifyReply?: (id: string | number, content: { comment: string; isSecret: boolean }) => void;
  onDeleteReply?: (id: string | number) => void;
}

const CommentWithReplies: React.FC<CommentWithRepliesProps> = ({
  comment,
  onModifyComment,
  onDeleteComment,
  onCreateReply,
  onModifyReply,
  onDeleteReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState({ comment: comment.content, isSecret: false });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleToggleSecret = () => {
    setEditContent(prev => ({ ...prev, isSecret: !prev.isSecret }));
  };

const handleReplySubmit = async () => {
  if (comment.isReply) {
    if (onModifyReply) {
      await onModifyReply(comment.id, editContent);
    }
  } else {
    if (onCreateReply) {
      await onCreateReply(comment.id, editContent);
    }
  }
};

  const handleCommentModify = async () => {
    await onModifyComment(comment.id, editContent);
    setIsEditing(false);
  };

  return (
    <div className="comment-with-replies">
      <div>
        <span>{comment.modifiedBy}</span>
        <span>{comment.modifiedOn}</span>
        {isEditing ? (
          <BasicCommentCreateForm
            comment={editContent.comment}
            isSecret={editContent.isSecret}
            onCommentChange={handleEditChange}
            onToggleSecret={handleToggleSecret}
            onSubmit={handleCommentModify}
          />
        ) : (
          <div>
            <p>{comment.content}</p>
            {comment.isMine && (
              <>
                <button onClick={() => setIsEditing(true)}>수정</button>
                <button onClick={() => onDeleteComment(comment.id)}>삭제</button>
              </>
            )}
            {!comment.isReply && <button onClick={() => setIsReplying(true)}>대답 쓰기</button>}
          </div>
        )}
      </div>
      {isReplying && (
        <BasicCommentCreateForm
          comment={editContent.comment}
          isSecret={editContent.isSecret}
          onCommentChange={handleEditChange}
          onToggleSecret={handleToggleSecret}
          onSubmit={handleReplySubmit}
        />
      )}
      {comment.replies && (
        <div className="pl-4">
          {comment.replies.map(reply => (
            <CommentWithReplies
              key={reply.id}
              comment={reply}
              onModifyComment={onModifyComment}
              onDeleteComment={onDeleteComment}
              onCreateReply={onCreateReply}
              onModifyReply={onModifyReply}
              onDeleteReply={onDeleteReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentWithReplies;

