import { CommentItem } from "@/types/common/comment";
import React from "react";

interface CommentProps {
  commentData: CommentItem;
  onModifyComment: (id: string | number) => void;
  onModifyReply?: (id: string | number) => void;
  onDeleteComment: (id: string | number) => void;
  onDeleteReply?: (id: string | number) => void;
}

const Comment: React.FC<CommentProps> = ({
    commentData,
    onModifyComment,
    onModifyReply,
    onDeleteComment,
    onDeleteReply
}) => {
    const { content, modifiedBy, modifiedOn, isMine, status, isReply } = commentData;

    // 댓글일 경우와 아닐 경우 다른 메서드 호출
    const handleModify = () => {
        if(isReply && onModifyReply) {
            onModifyReply(commentData.id);
        } else {
            onModifyComment(commentData.id);
        }
    };

    const handleDelete = () => {
        if(isReply && onDeleteReply) {
            onDeleteReply(commentData.id);
        } else {
            onDelete(commentData.id);
        }
    }

    return (
        <div className="border rounded-md p-4 mb-2 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-sm font-semibold">{modifiedBy}</span>
          <span className="text-xs text-gray-500 ml-2">{modifiedOn}</span>
        </div>
        {isMine && status === 'active' && (
          <div className="flex items-center space-x-3">
            <button onClick={handleModify} className="text-blue-500 hover:underline text-xs">
              수정
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:underline text-xs">
              삭제
            </button>
          </div>
        )}
      </div>
      <div className="text-sm">
        <p>{content}</p>
      </div>
    </div>
    )


}

export default Comment;