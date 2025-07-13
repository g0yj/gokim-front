import React from "react";
import log from "@/lib/logger";
import CustomButton from "../common/CustomButton ";

const ProjectForm = () => {
  log.debug("프로젝트 등록/수정 폼 실행");

  return (
    <div className="w-full max-w-md p-6 flex flex-col gap-6 bg-white rounded-xl shadow-md">
      {/* 프로젝트 이름 */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="projectName"
          className="text-sm font-semibold text-gray-700"
        >
          프로젝트 이름
        </label>
        <input
          id="projectName"
          type="text"
          placeholder="프로젝트명을 입력하세요"
          className="px-3 py-1.5 h-9 text-sm border border-gray-300 rounded-md "
        />
      </div>

      {/* 기능 추가 영역 */}
      <div className="flex items-center gap-2">
        <select className="w-[20%] h-9 px-2 text-sm border border-gray-300 rounded-md">
          <option value="">기능</option>
          <option value="ISSUE">이슈</option>
          <option value="TASK">태스크</option>
        </select>
        <input
          type="text"
          placeholder="기능 이름 입력"
          className="h-9 px-3 text-sm border border-gray-300 rounded-md flex-1 min-w-0"
        />
        <CustomButton size="sm" className="h-9 px-3 text-sm whitespace-nowrap">
          +
        </CustomButton>
      </div>

      {/* 추가된 기능 목록 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">기능 목록</label>
        <div className="flex flex-col gap-2">
          {/* map으로 반복 렌더링 */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md">
            <span className="text-sm text-gray-800">[이슈] 기능 이름</span>
            <button className="text-red-500 hover:text-red-700 text-sm">
              X
            </button>
          </div>
        </div>
      </div>
      {/* 멤버 추가 영역 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">멤버 추가</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="ID 또는 이메일"
            className="h-9 px-3 text-sm border border-gray-300 rounded-md flex-1 min-w-0"
          />
          <CustomButton
            size="sm"
            className="h-9 px-3 text-sm whitespace-nowrap"
          >
            검색
          </CustomButton>
        </div>
      </div>

      {/* 추가된 멤버 목록 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">참여 멤버</label>
        <div className="flex flex-col gap-2">
          {/* map으로 반복 렌더링 */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md">
            <span className="text-sm text-gray-800">박혜인</span>
            <button className="text-red-500 hover:text-red-700 text-sm">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

/**
flex-1	input이 가능한 한 넓게 차지하도록 함
min-w-0	input이 부모의 overflow를 무시하지 않도록
whitespace-nowrap	버튼 텍스트 줄바꿈 방지
h-9 px-3 text-sm	버튼과 인풋의 높이/내부 여백 맞춤
 */