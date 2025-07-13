import ProjectApi from "@/api/projectApi";
import { CreateProject, FunctionTypeOption } from "@/types/project";

const ProjectService = {
  listFunction: async (): Promise<FunctionTypeOption[]> => {
    return ProjectApi.getListFunction();
  },

    createProject: async (data: CreateProject): Promise<void> => {
        return ProjectApi.postProject(data);
  }
};

export default ProjectService;
