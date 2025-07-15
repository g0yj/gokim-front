export const CommentStatus = {
    ACTIVE: 'active',
    DELETE: 'deleted',
    HIDDEN: 'hidden',
    SECRET: 'secret' 
}

type CommentStatusType = typeof CommentStatus[keyof typeof CommentStatus];

export type CommentItem = {
    id: string | number;
    parentId: string | number | null; // 부모 식별키, null일 시 댓글임
    content: string;
    modifiedBy: string | null;
    modifiedOn: string | null;
    isMine: boolean;
    isReply: boolean; // 댓글인지 아닌지
    status: CommentStatusType; // 댓글 상태( 비밀, 삭제 등... )
    replies?: CommentItem[];
    customFields: {}, // 커스텀 필드 (확장을 위해 .. )
}


/** 확장 예시 ***************************************************************************************8

    // 확장 필드 선언
    const comment = {
    id: '3',
    content: 'Interesting comment',
    customFields: {
        experimentGroup: 'A' // 사용자가 속한 테스트 그룹
    },
    };

    // 사용 예시
    const Comment = ({ commentData }) => {
        const { content, customFields } = commentData;
        
        // 우선순위에 따른 클래스 적용
        const priorityClass = customFields?.priority === 'high' ? 'bg-yellow-100' : 'bg-white';

        // 사용자 정의 테마 적용
        const themeClass = customFields?.theme === 'dark-mode' ? 'text-white bg-gray-800' : 'text-black';

 */