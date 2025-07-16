import ProjectApi from "@/api/projectApi";

import log from "@/lib/logger";
import { CreateProject, FunctionTypeOption, ListProjectsWithTotalMember, ProjectFunctionItem, ProjectsWithTotalMember } from "@/types/project";
 


const ProjectService = {
  listFunction: async (): Promise<FunctionTypeOption[]> => {
    return ProjectApi.getListFunction();
  },

  createProject: async (data: CreateProject): Promise<void> => {
        return ProjectApi.postProject(data);
  },


  listProject: async (): Promise<ListProjectsWithTotalMember> => {
    // api를 통해 데이터 조회
    const res = await ProjectApi.getListProject();

    // totalMembers 값을 계산하고 수정해 반환
    const projectsWithTotalMembers: ProjectsWithTotalMember[] = res.map((project) => ({
    ...project,
    totalMember: project.projectMembers.length
  }));

  log.debug("service 수정된 데이터", projectsWithTotalMembers)
    // 수정된 데이터 반환
    return projectsWithTotalMembers;
  },

  projectFuncsions: async(projectId: string): Promise<ProjectFunctionItem[]>=> {
    return await ProjectApi.getProjectFunctions(projectId);
  },
  

};

export default ProjectService;
