import React, { useEffect, useState } from "react";
import log from "@/lib/logger";
import CustomButton from "../common/CustomButton ";
import { useForm } from "react-hook-form";
import { CreateProject, FunctionTypeOption, ProjectFunctionType } from "@/types/project";
import ProjectService from "@/services/projectService";

type ProjectFormProps = {
  onCancel: () => void;
};

const ProjectForm = ({ onCancel }: ProjectFormProps) => {
  // 셀렉트 박스에 사용되는 api 용
  const [functionTypeOptions, setFunctionTypeOptions] = useState<
    FunctionTypeOption[]
  >([]);
  const [selectedType, setSelectedType] = useState<ProjectFunctionType>("PAGE");

  const {
    register,
    handleSubmit: onValidSubmit,
    formState: { error },
  } = useForm<CreateProject>({
    defaultValues: {
      projectName: "",
      projectFunctions: [],
      projectMemberIds: [],
    },
  });

  // form 전송에서 유효한 경우 실행되는 함수라 onValid 사용했음.
  const onValid = (data: CreateProject) => {
    log.debug("등록 버튼 클릭");
  };

  useEffect(() => {
    const fetchFunctionOption = async () => {
      try {
        const res = await ProjectService.listFunction();
        setFunctionTypeOptions(res);
      } catch (err) {
        log.error("기능 조회 axios 실패", err);
      }
    };
    fetchFunctionOption();
  }, []);

  return (
    <form
      className="w-full max-w-md p-6 flex flex-col gap-6 bg-white rounded-xl shadow-md"
      onSubmit={onValidSubmit(onValid)}
    >
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
          className="px-3 py-1.5 h-9 text-sm border border-gray-300 rounded-md"
        />
      </div>

      {/* 기능 추가 영역 */}
      <div className="flex items-center gap-2">
        <select
          className="w-[20%] h-9 px-2 text-sm border border-gray-300 rounded-md"
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value as ProjectFunctionType)
          }
        >
          <option value="PAGE">기능</option>
          {functionTypeOptions.map((option) => (
            <option
              key={option.projectFunctionType}
              value={option.projectFunctionType}
            >
              {option.functionName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="기능 이름 입력"
          className="h-9 px-3 text-sm border border-gray-300 rounded-md flex-1 min-w-0"
        />
        <CustomButton
          variant="secondary"
          size="sm"
          className="h-9 px-3 text-sm whitespace-nowrap"
        >
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
            variant="secondary"
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

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2">
        <CustomButton
          type="submit"
          variant="primary"
          size="sm"
          className="h-9 px-4 text-sm"
        >
          등록
        </CustomButton>
        <CustomButton
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-sm"
          onClick={onCancel}
        >
          취소
        </CustomButton>
      </div>
    </form>
  );
};

export default ProjectForm;
