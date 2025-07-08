import BasicBoardForm from "@/components/board/BasicBoardForm";
import BasicBoardView from "@/components/board/BasicBoardView";
import log from "@/lib/logger";
import NoticeService from "@/services/noticeService";
import { BoardFile } from "@/types/common/board";
import { NoticeDetailItem } from "@/types/notice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoticeDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<NoticeDetailItem | null> (null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isMine, setIsMine] = useState(false);


    useEffect(() => {

        
        
        const fetchData = async () => {
            try{
                if( !id) return;
                const res = await NoticeService.detail(id);
                if(res.userRole === 'ADMIN'){
                    setIsMine(true);
                }
                setData(res);

            } catch (err) {
                log.error('공지사항 상세 조회 axios 실패', err);
            }
        }
        fetchData();
    }, [id])

    // fetchData 이후 data가 업데이트되면 다시 로깅
useEffect(() => {
  if (data) {
    const files = data.files;
    log.debug('files 데이터 확인', files);
    log.debug('isMine이 true인지 확인', isMine);
  }
}, [data]);

    const handleUpdate = () => {
        log.debug('수정클릭');
    }

    const handleCancelEdit = () => {
        log.debug('수정 취소');
    }

    const handleEdit = () => {
        log.debug('수정 등록');
    }

    const handleDelete = () => {
        log.debug('수정모드 취소');
    }



    return (
        <div className="w-[800px] mt-8 mx-auto">
            {/* 데이터 로딩 완료 후 렌더링 */}
            {data ? (
                isEditMode ? (
                <BasicBoardForm
                    mode="edit"
                    defaultValues={{
                    title: data.title,
                    content: data.content,
                    files: data.files, // 새로 추가된 파일만 전달
                    }}
                    onSubmit={handleUpdate}
                    onCancel={handleCancelEdit}
                        getFileId={(file) => {
                            return file.noticeFileId ?? '';
                    }}
                />
                ) : (
                <BasicBoardView
                    title={data.title}
                    content={data.content}
                    files={data.files}
                    isMine= {isMine}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCancel={() => navigate('/notice')}
                    getFileKey={(file) => file.url}
                />
                )
            ) : (
                <p className="text-center text-gray-500">로딩 중...</p>
            )}
        </div>
    )

}

export default NoticeDetailPage;