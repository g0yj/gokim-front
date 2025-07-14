import ProjectCard from "@/components/project/ProjectCard";
import ProjectForm from "@/components/project/ProjectCreateForm";
import log from "@/lib/logger";
import ProjectService from "@/services/projectService";
import { ListProjectsWithTotalMember, ProjectsWithTotalMember } from "@/types/project";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();
  const [listProject, setListProject] = useState<ProjectsWithTotalMember[]>([]);

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
    <div className="flex justify-between mt-10">
      {/**  w-2/4 grid grid-cols-1 md:grid-cols-2 gap-4*/}
      <div className="w-2/6" >
        <ProjectForm onCancel={handleCancel} />
      </div>
      <div className="w-1/6" ></div>
      
      
      <div className="w-3/6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {listProject.length > 0 ? 
        (
          listProject.map((project) => (
            <ProjectCard key= {project.id} data={project} />
          ))
        )
        :(
          <div> 프로젝트를 추가해주세요</div>
        )
        }
      </div>
    </div>
  );
};

export default Project;

/**
  - `grid-cols-1`: 기본적으로 한 줄에 한 개의 카드만 배치됩니다.
  - `md:grid-cols-2`: `md:` 브레이크포인트 기준으로 화면 너비가 커질 경우 한 줄에 두 개의 카드가 배치됩니다.
  - `gap-4`**: 그리드의 각 항목 간 간격을 지정합니다.
 */

  /**
   * w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4
   * - 상위에 flex 선언
   * - w-1/3과 w-1/2 을 사용해 여러개 div를 다른 비율로 나눠 각 화면의 너비를 차지하게 할 수 있음
   * - grid grid-cols-1 md:grid-cols-2 : 작은 화면에서는 하나의 카드가 나란히, 더 큰 화면에서는 두개의 카드가 나란히 보이도록
   * - gap-4 : 그리드 내부의 각 카드 사이의 간격을 설정
   */