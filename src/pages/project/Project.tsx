import ProjectCard from "@/components/project/ProjectCard";
import ProjectForm from "@/components/project/ProjectCreateForm";
import log from "@/lib/logger";
import ProjectService from "@/services/projectService";
import { ListProjectItem } from "@/types/project";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
  const [listProject, setListProject] = useState<ListProjectItem[]>([]);

  const handleCancel = () => {
    log.debug("취소버튼 클릭");
  };

  const handleListProject = async () => {
    try {
      const res = await ProjectService.listProject();
      log.info('최종 전달 받은 데이터 확인', res);
      setListProject(res);
      } catch (err) {
        log.error("프로젝트 목록 조회 axios 실패", err);
        navigate('/project');
      }
  }

  useEffect(() => {
      handleListProject();
    }, []);

  return (
    <div className="flex justify-between">
      <div>
      <ProjectForm onCancel={handleCancel} />
      </div>
      <div>
        카드 목록 자리
      </div>
    </div>
  );
};

export default Project;
