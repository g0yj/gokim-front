import log from "@/lib/logger";
import React from "react";

const ProjectForm = () => {
  log.debug("프로젝트 등록/수정 폼 실행");
  return (
    <div className="w-full max-w-2xl p-6 flex flex-col gap-6 bg-white rounded-xl shadow-md">
      {/** 프로젝트 이름 */}
      <div className="flex flex-col gap-1">
        <label>프로잭트 이른</label>
      </div>

      {/** 기능 추가 영역 */}
      <div></div>

      {/** 추가된 기능 목록 */}
      <div></div>

      {/** 멤버 추가 영역 */}
      <div></div>

      {/** 추가된 멤버 목록 */}
      <div></div>
    </div>
  );
};

export default ProjectForm;
