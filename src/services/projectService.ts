import ProjectApi from "@/api/projectApi";
import { BasicSideBarItem } from "@/types/common/sideBar";
import { CreateProject, FunctionTypeOption, ProjectFunctionItem } from "@/types/project";

const ProjectService = {
  listFunction: async (): Promise<FunctionTypeOption[]> => {
    return ProjectApi.getListFunction();
  },

  createProject: async (data: CreateProject): Promise<void> => {
        return ProjectApi.postProject(data);
  },

  projectFuncsions: async(projectId: string): Promise<ProjectFunctionItem[]>=> {
    return await ProjectApi.getProjectFunctions(projectId);
  },

};

export default ProjectService;
