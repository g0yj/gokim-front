import BasicBoardSearchBox from "@/components/board/BasicBoardSearchBox";
import CustomButton from "@/components/common/CustomButton ";
import CustomModal from "@/components/common/CustomModal";
import CustomPagination from "@/components/common/CustomPagination";
import CommunityCard from "@/components/community/CommunityCard";
import { defaultSearchValues } from "@/constants/board";
import log from "@/lib/logger";
import CommunityService from "@/services/communityService";
import { BasicBoardSearchFields } from "@/types/common/board";
import { CommonListResponse, SelectOption } from "@/types/common/common";
import { CreateCommunity, ListCommunityItem } from "@/types/community";
import { getInitialRes } from "@/utils/board";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  // 검색 조건용 useForm (form 태그 없음) > form이 없는데 useForm 사용하는 이유
  const paramQuery = useForm<BasicBoardSearchFields>({
    defaultValues: defaultSearchValues, // CommunityBoardPage 에서 paramQuery와 비교
  });

  // 등록용 모달 form
  const {
    register,
    handleSubmit: handleModalSubmit, // handleSubmit은 리액트가 제공하는 함수명. handleModalSubmit는 별칭임. (handleSubmit === handleModalSubmit)
    formState: { errors },
    reset, // 모든 필드의 상태와 값을 초기화하는 메서드 : reset(), reset({})
  } = useForm<CreateCommunity>();

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 커뮤니티 리스트 상태
  const [data, setData] =
    useState<CommonListResponse<ListCommunityItem>>(getInitialRes);

  // 검색 조건 옵션
  const limitOptions: SelectOption[] = [
    { label: "5건", value: 5 },
    { label: "10건", value: 10 },
    { label: "20건", value: 20 },
    { label: "50건", value: 50 },
  ];

  const searchOptions: SelectOption[] = [
    { label: "전체", value: "all" },
    { label: "제목", value: "title" },
    { label: "내용", value: "description" },
  ];

  //  목록 조회
  const handleSearch = async () => {
    try {
      const values = paramQuery.getValues();
      const res = await CommunityService.listCommunity(values);
      log.debug("커뮤니티 목록 ", res);
      setData(res);
    } catch (err) {
      log.debug("axios 호출 실패", err);
    }
  };

  // 페이지 변경 시
  const handlePageChange = (page: number) => {
    paramQuery.setValue("page", page);
    handleSearch();
  };

  // 카드 클릭 시 상세로 이동
  const handleCardClick = (communityId: string) => {
    if (communityId) {
      navigate(`/community/${communityId}`);
    } else {
      log.error("boardId가 없음. 생성된 게시판이 없는 커뮤니티");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    reset({
      title: "",
      description: "",
    }); // 폼 상태 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  // 등록 폼 제출 시 실행되는 함수
  const handleCreateCommunity = async (formValues: CreateCommunity) => {
    try {
      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("description", formValues.description ?? "");
      await CommunityService.createCommunity(formData);
      handleSearch();
    } catch (err) {
      log.error("커뮤니티 생성 api 호출 실패", err);
    }
    reset(); // 초기화
    handleCloseModal();
  };

  // 스크랩 변경 시 호출
  const handleScrapClick = async (item: ListCommunityItem) => {
    try {
      await CommunityService.toggleScrap(item.id, item.isScrapped);
      handleSearch();
    } catch (err) {
      log.error("스크랩 변경 axios 호출 실패", err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="mt-10">
      <BasicBoardSearchBox
        paramQuery={paramQuery}
        limits={limitOptions}
        searches={searchOptions}
        onSearch={handleSearch}
        onModal={handleOpenModal}
      ></BasicBoardSearchBox>

      {/** 커뮤니티 생성 모달 */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          size="createCommunity"
          variant="basic"
        >
          {/**  onSubmit={handleModalSubmit(handleCreateSubmit)} 메커니즘*/}
          <form
            onSubmit={handleModalSubmit(handleCreateCommunity)}
            className="space-y-4"
          >
            {/* 제목 */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                커뮤니티명
              </label>
              <input
                {...register("title", { required: "커뮤니티명은 필수입니다" })}
                className="w-full border rounded px-3 py-2"
              />
              {
                //위에서 required 사용함으로써 errors를 사용하게 됨
                errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )
              }
            </div>

            {/** 설명 */}
            <div>
              <label className="block text-sm font-semibold mb-1">설명</label>
              <textarea
                {...register("description")}
                className="w-full border rounded px-3 py-2 min-h-[100px]"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2 pt-4">
              <CustomButton variant="primary" type="submit">
                생성
              </CustomButton>
              <CustomButton variant="secondary" onClick={handleCloseModal}>
                닫기
              </CustomButton>
            </div>
          </form>
        </CustomModal>
      )}

      {/** 커뮤니티 카드 목록 */}
      <div className="flex flex-wrap">
        {data.list.map((item, idx) => (
          <CommunityCard
            key={idx}
            data={item}
            onClick={() => handleCardClick(item.id ?? "")}
            onScrap={() => handleScrapClick(item)}
          />
        ))}
      </div>

      {/** 페이지네이션 */}
      <div className="w-fit mx-auto mb-4">
        <CustomPagination
          page={data.currentPage}
          totalPage={data.totalPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Community;

/**
 *  >>> form이 없는데 useForm 사용하는 이유
 *  react-hook-form은 꼭 <form> 태그와 submit 이벤트를 사용하지 않아도 동작함
 *  예시로 검색 조건이 있는데 단순 검색이라면 useState로 간단하게 처리하기도 하지만 검색 조건이 많다면 useForm이 유리
 * - 각 입력 필드의 상태값
 * - watch()로 실시간 감시
 * - setValue() 로 필드값 갱신
 * - getValues() 로 현재 상태값 추출
 */

/**
 * >>> onSubmit={handleModalSubmit(handleCreateCommunity)} 메커니즘
 * - React Hook Form의 핵심 메커니즘.
 * - handleModalSubmit
 *    1. 상위함수로, react의 handleSubmit 함수.
 *    2. 내부적으로 유효성 검사 및 이벤트 방지 처리
 * - handleCreateCommunity
 *    1. 콜백 함수
 *    2. 실제 폼 제출이 성공적으로 유효성 검사를 통과했을 때 실행될 함수
 *
 * - 전체 흐름
 *    1. 사용자가 <form>에서 submit 을 누름
 *    2. react-hook-form의 handleSubmit (handleModalSubmit)이 실행
 *    3. 내부적으로 e.preventDefault() 호출 & 각 필드의 유효성 검사 실행
 *    4. 유효성 통과 되면 handleCreateCommunity(value) 가 호출
 */
