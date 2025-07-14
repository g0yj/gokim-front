import member from "@/assets/project/member.png";
import owner from "@/assets/project/owner.png";
import log from "@/lib/logger";
import React from "react";
import { ListProject, ListProjectItem, ProjectsWithTotalMember } from "@/types/project";
import { useNavigate } from "react-router-dom";

type ProjectProps = {
  data:ProjectsWithTotalMember
};

const ProjectCard = ({ data }: ProjectProps) => {

  const navigate = useNavigate();
  const loginId = localStorage.getItem("loginId");

  const onclick = () => {
    log.debug("onClick 클릭");
  }

  return (
    <div
      className="max-w-md lg:max-w-sm border-2 p-4 flex flex-col items-center mb-4 cursor-pointer"
      onClick={onclick}
    >
      <div>
        {/* 삼항 연산자를 사용한 조건부 이미지 렌더링 */}
        <img 
          src={data.ownerId === loginId ? owner : member} 
          className="w-16 h-16 mb-4" 
        />
      </div>
      <div className="w-full flex flex-col justify-between items-center mb-2 border">
        <div className="text-left text-sm truncate" style={{ maxWidth: "150px" }}>
          {data.projectName}
        </div>
        <span className="text-sm">인원: {data.totalMember}명</span>
      </div>
    </div>
  );
};


export default ProjectCard;
