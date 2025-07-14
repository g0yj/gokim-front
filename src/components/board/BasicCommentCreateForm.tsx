import log from "@/lib/logger";
import { BasicCommentCreateProps } from "@/types/common/board";
import CustomButton from "../common/CustomButton ";
import publicIcon from "@/assets/common/Unlock.png";  // 기본적으로 public 아이콘
import privateIcon from "@/assets/common/Lock.png"; 


const BasicCommentCreateForm: React.FC<BasicCommentCreateProps> = ({
    comment,
    isSecret,
    onCommentChange,
    onToggleSecret,
    onSubmit
}) => {
    log.debug('댓글등록폼 컴포넌트');
    return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        className="flex-grow border p-2 mr-2 text-sm placeholder-gray-400"
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={onCommentChange}
        style={{ height: '36px' }}
      />
      <img
        src={isSecret ? privateIcon : publicIcon}
        alt="Secret Toggle"
        className="cursor-pointer w-6 h-6 mr-2"
        onClick={onToggleSecret}
      />
      <CustomButton
        variant="primary"
        size="sm"
        className="h-9 px-3 text-sm whitespace-nowrap"
        onClick={onSubmit}
      >
        등록
      </CustomButton>
    </div>
    )
}

export default BasicCommentCreateForm;