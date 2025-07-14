import { BasicCommentProps } from "@/types/common/board"
import React from "react"

const BasicCommentForm : React.FC<BasicCommentProps> = ({
    createdBy,
    createdOn,
    modifiedOn,
    content,
    imgUrl,
    onModify,
    onDelete,
    isMine,
    replyTo
}) => {

    // = !! 문법 어떻게 작동하는지?
    const isReply = !!replyTo; // 대댓글인지 확인

    return (
        <div
      className={`p-4 mb-2 border ${isReply ? 'ml-8 bg-gray-100' : 'bg-white'} shadow-sm rounded-md`}
    >
      <div className="flex items-center mb-2">
        {imgUrl && <img src={imgUrl} alt={createdBy} className="w-8 h-8 rounded-full mr-2" />}
        <p className="text-lg font-semibold">{createdBy}</p>
      </div>
      <p className="text-base">{content}</p>
      <div className="text-sm text-gray-500">
        <p>{createdOn && `Created on: ${createdOn}`}</p>
        <p>{modifiedOn && `Modified on: ${modifiedOn}`}</p>
      </div>
      {isMine && (
        <div className="flex mt-2">
          {onModify && <button onClick={onModify} className="mr-2 text-blue-500">Modify</button>}
          {onDelete && <button onClick={onDelete} className="text-red-500">Delete</button>}
        </div>
      )}
      {isReply && (
        <p className="text-sm text-gray-500 mt-2">Replying to comment ID: {replyTo}</p>
      )}
    </div>
    )
}



export default BasicCommentForm;

/**
 *  = !! 문법 어떻게 작동하는지?
1. **첫 번째 부정 연산자 (`!`)**: 이 연산자는 값을 `Boolean` 타입으로 변환하고 그 값을 부정합니다. 즉, "Truthy" 값은 `false`로, "Falsy" 값은 `true`로 변환됩니다.

2. **두 번째 부정 연산자 (`!`)**: 다시 한 번 부정함으로써 원래의 "Truthy" 또는 "Falsy" 상태를 `Boolean` 값으로 표현합니다.

### Truthy와 Falsy 값

JavaScript의 Truthy와 Falsy 값은 다음과 같습니다:

- **Falsy 값**: `false`, `0`, `""` (빈 문자열), `null`, `undefined`, `NaN`
- **Truthy 값**: Falsy가 아닌 모든 값은 Truthy입니다.
 */