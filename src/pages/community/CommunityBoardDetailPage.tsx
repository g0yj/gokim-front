import BasicBoardForm, {
  EditBoardFormValues,
} from "@/components/board/BasicBoardForm";
import BasicBoardView from "@/components/board/BasicBoardView";
import CommunityBoardComment from "@/components/community/CommunityBoardComment";
import log from "@/lib/logger";
import CommunityService from "@/services/communityService";
import { BoardFile } from "@/types/common/board";
import { CommunityBoardItem } from "@/types/community";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommunityBoardDetailPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [communityId, setCommunityId] = useState<string | null | undefined>(
    null
  );

  const [data, setData] = useState<CommunityBoardItem | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteFileIds, setDeleteFileIds] = useState<(string | number)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!boardId) return;
        const res = await CommunityService.boardDetail(boardId);
        setCommunityId(res.communityId);
        log.debug("communityId", communityId);

        // 파일 필드명 매칭을 위함
        const modifiedFiles = res.files
          ? res.files.map((file: BoardFile) => ({
              ...file,
              id: file.boardFileId,
            }))
          : undefined;

        setData({
          ...res,
          files: modifiedFiles,
        });
      } catch (err) {
        log.error("커뮤니티 게시판 상세 조회 axios 실패", err);
      }
    };

    fetchData();
  }, [boardId]);

  // 수정 버튼 -> 폼으로 전환
  const handleEdit = () => {
    setIsEditMode(true);
  };
  // 취소 버튼 -> 보기 모드로 전환
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setDeleteFileIds([]);
  };

  // 삭제 버튼 -> 삭제 요청 후 리스트로 페이지 이동
  const handleDelete = async () => {
    if (!boardId) return;
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await CommunityService.deleteCommunityBoard(boardId);
      navigate(`/community/${communityId}`);
    } catch (err) {
      log.error("커뮤니티 게시글 삭제 axios 호출 실패", err);
    }
  };

  // 파일 삭제 (UI적으로 목록에서 제거 + 파일 식별키 저장)
  const deleteFiles = (fileId: string | number) => {
    setDeleteFileIds((prev) => [...prev, fileId]);
    setData((prev) => {
      return prev
        ? { ...prev, files: prev.files?.filter((f) => f.id !== fileId) }
        : null;
    });
  };

  // 게시글 수정
  const handleUpdate = async (formValues: EditBoardFormValues) => {
    log.debug("기존값 그대로 넣어보겟음", formValues);
    if (!boardId) return;
    try {
      const formData = new FormData();
      formData.append("title", formValues.title ?? "");
      formData.append("content", formValues.content ?? "");

      let files: File[] = [];
      if (formValues.files) {
        if (formValues.files instanceof FileList) {
          files = Array.from(formValues.files);
        } else if (Array.isArray(formValues.files)) {
          files = formValues.files.filter((file): file is File => {
            return file instanceof File;
          });
        }
      }

      files.forEach((file) => formData.append("files", file));

      // 삭제할 파일의 식별키 담기
      if (deleteFileIds.length > 0) {
        deleteFileIds.forEach((fileId) => {
          formData.append("deleteFileIds", String(fileId));
        });
        log.debug("삭제 대상 파일 Ids: ", deleteFileIds);
      }

      await CommunityService.updateCommunityBoard(formData, boardId);

      //수정 완료 후 변경 내용을 바탕으로 상세 페이지 재조회
      setIsEditMode(false);
      setDeleteFileIds([]);

      const updated = await CommunityService.boardDetail(boardId);
      setData(updated);
    } catch (err) {
      log.error("커뮤니티 게시글 수정 axios 호출 실패", err);
    }
  };
  return (
    <div className="w-[800px] mt-8 mx-auto">
      {data ? (
        isEditMode ? (
          <BasicBoardForm
            mode="edit"
            defaultValues={{
              title: data.title,
              content: data.content,
              files: data.files,
            }}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            deleteFileId={deleteFiles}
          />
        ) : (
          <div>
            <BasicBoardView
              title={data.title}
              content={data.content}
              files={data.files}
              isMine={data.isMine ?? false}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onCancel={() => navigate(`/community/${communityId}`)}
            />
            {!isEditMode && <CommunityBoardComment boardId = {boardId ?? ''} />}
          
          </div>
        )
      ) : (
        <p className="text-center text-gray-500">로딩 중...</p>
      )}
    </div>
  );
};

export default CommunityBoardDetailPage;
