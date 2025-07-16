import ProjectForm from "@/components/project/ProjectCreateForm";
import log from "@/lib/logger";
import ProjectService from "@/services/projectService";
import { useEffect } from "react";

const Project = () => {
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await ProjectService.listFunction();
        log.debug('식별키 확인용', res);

      } catch (err) {
        log.error('식별키 불러오기 실패', err);
      }
    }
    fetchData();
  },[]);
  const handleCancel = () => {
    log.debug("취소버튼 클릭");
  };
  return (
    <div>
      <ProjectForm onCancel={handleCancel} />
    </div>
  );
};

export default Project;
