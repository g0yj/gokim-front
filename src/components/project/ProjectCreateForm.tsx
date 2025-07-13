import React, { useEffect, useState } from "react";
import log from "@/lib/logger";
import CustomButton from "../common/CustomButton ";
import { useForm } from "react-hook-form";
import {
  CreateProject,
  CreateProjectFunction,
  CreateProjectMemberId,
  FunctionTypeOption,
  ProjectFunctionType,
} from "@/types/project";
import ProjectService from "@/services/projectService";
import { FUNCTION_TYPE_LABELS } from "@/constants/mappingData";
import UserService from "@/services/userService";
import { useNavigate } from "react-router-dom";

type ProjectFormProps = {
  onCancel: () => void;
};

const ProjectForm = ({ onCancel }: ProjectFormProps) => {
  const navigate = useNavigate();

  // 셀렉트 박스에 사용되는 api 용
  const [functionTypeOptions, setFunctionTypeOptions] = useState<
    FunctionTypeOption[]
  >([]);

  // 기능 추가 시 사용
  const [projectFunctions, setProjectFunctions] = useState<
    CreateProjectFunction[]
  >([]);
  const [functionName, setFunctionName] = useState("");
  const [selectedType, setSelectedType] = useState<ProjectFunctionType>("PAGE");

  // 멤버를 추가하기 위해 사용
  const [memberSearchInput, setMemberSearchInput] = useState(""); // 검색용
  const [projectMembers, setProjectMembers] = useState<CreateProjectMemberId[]>(
    []
  ); // 멤버용

  const {
    reset,
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

  /** 기능 추가 */
  const handleAddFunction = () => {
    // onChange가 정의 되어 있어야함!!
    if (!selectedType || functionName.trim() === "") {
      alert("기능 타입과 이름을 모두 입력해주세요");
      return;
    }

    const newFunction: CreateProjectFunction = {
      projectFunctionType: selectedType,
      projectFunctionName: functionName,
      functionSort: projectFunctions.length,
      projectExists: false,
    };
    // 기존 기능에 추가 기능을 담음
    setProjectFunctions((prev) => [...prev, newFunction]);
    // + 클릭시 배열에 추가되었고 초기화 되어야함
    setFunctionName("");
    setSelectedType("PAGE");

    log.debug("기능에대한 데이터", newFunction);
  };

  /** 기능 제거 */
  const handleRemoveFunction = (targetIdx: number) => {
    setProjectFunctions((prev) =>
      // _ 가 의미하는 것?
      prev.filter((_, currentIdx) => currentIdx !== targetIdx)
    );
  };

  /** 회원 검색 API실행 */
  const handleSearchMember = async () => {
    if (!memberSearchInput.trim()) {
      alert("회원 아이디를 입력해주세요");
      return;
    }
    try {
      const res = await UserService.search(memberSearchInput);

      // 본인 아이디일 시 예외 처리
      const loginId = localStorage.getItem("loginId");
      if (loginId && memberSearchInput === loginId) { // null 방지를 위해 && 사용
        alert("본인 아이디는 자동으로 추가됩니다");
        setMemberSearchInput("");
        return;
      }
      if (res === memberSearchInput) {
        const newMember: CreateProjectMemberId = {
          projectMemberId: memberSearchInput,
        };

        // 중복 방지
        const isDuplicate = projectMembers.some(
          (member) => member.projectMemberId === memberSearchInput
        );
        if (isDuplicate) {
          alert("이미 추가된 회원입니다");
          return;
        }

        // 멤버 담기
        setProjectMembers((prev) => [...prev, newMember]);
        // 초기화
        setMemberSearchInput("");
      }
    } catch (err) {
      log.error("회원찾기 axios 호출 실패", err);
      setMemberSearchInput("");
    }
  };
  /** 멤버 삭제 */
  const handleRemoveMember = (targetIdx: number) => {
    setProjectMembers((prev) =>
      prev.filter((_, currentIdx) => currentIdx !== targetIdx)
    );
  };

  /** 프로젝트 생성*/
  // form 전송에서 유효한 경우 실행되는 함수라 onValid 함수명 사용했음.
  const onValid = async (data: CreateProject) => {
    log.debug("등록 버튼 클릭");
    if (projectFunctions.length === 0) {
      alert('기능을 하나 이상 추가해주세요');
      return;
    }

    // 전송 데이터
    const payload: CreateProject = {
      projectName: data.projectName,
      projectFunctions: projectFunctions,
      projectMemberIds: projectMembers,
    };

    try {
      await ProjectService.createProject(payload);
      alert("프로젝트가 생성되었습니다");
      // 폼 초기화
      reset(); // useForm 값 초기화
      setProjectFunctions([]);
      setProjectMembers([]);

      navigate("/project");
      
    } catch (err) {
      log.error('프로젝트 생성 axios 실패', err);
    }

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
          {...register("projectName", { //useForm을 사용해서 전달하기 때문에 htmlFor이랑만 매칭한다고 되는게 아님
            required: "프로젝트 이름은 필수입니다.",
          })}
        />
      </div>

      {/* 기능 추가 영역 */}
      <div className="flex items-center gap-2">
        <select
          className="w-[25%] h-9 px-2 text-sm border border-gray-300 rounded-md"
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value as ProjectFunctionType)
          }
        >
          <option value="PAGE">기능선택</option>
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
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />
        <CustomButton
          variant="secondary"
          size="sm"
          className="h-9 px-3 text-sm whitespace-nowrap"
          onClick={handleAddFunction}
        >
          +
        </CustomButton>
      </div>

      {/* 추가된 기능 목록 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">기능 목록</label>
        <div className="flex flex-col gap-2">
          {/* map으로 반복 렌더링 */}
          {projectFunctions.map((func, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md"
            >
              <span className="text-sm text-gray-800">
                [
                {FUNCTION_TYPE_LABELS[
                  func.projectFunctionType as ProjectFunctionType
                ] ?? "알 수 없음"}
                ] {func.projectFunctionName}
              </span>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                type="button"
                onClick={() => handleRemoveFunction(idx)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 멤버 추가 영역 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">멤버 추가</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={memberSearchInput}
            onChange={(e) => setMemberSearchInput(e.target.value)}
            placeholder="회원의 아이디"
            className="h-9 px-3 text-sm border border-gray-300 rounded-md flex-1 min-w-0"
          />
          <CustomButton
            variant="secondary"
            size="sm"
            className="h-9 px-3 text-sm whitespace-nowrap"
            onClick={handleSearchMember}
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
          {projectMembers.map((member, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md"
            >
              <span className="text-sm text-gray-800">
                {member.projectMemberId}
              </span>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => handleRemoveMember(idx)}
              >
                X
              </button>
            </div>
          ))}
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

/**
 _ 가 의미하는 것?
filter는 (value, index) => boolean 형태의 콜백을 받음
우리는 여기서 index만 필요하고, value는 쓰지 않으니까 _로 이름 붙여 무시한 거야
이건 ESLint나 협업 코딩 컨벤션에서 **"사용하지 않는 변수"**를 명확히 나타내는 패턴이야
🔍 (_, idx)는 (value, index)에서 value는 무시하고 index만 쓰겠다는 의미.
 */
