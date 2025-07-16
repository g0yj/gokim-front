import api from "@/lib/axios";
import log from "@/lib/logger";
import { CreateProject, FunctionTypeOption, ProjectFunctionItem } from "@/types/project";

const ProjectApi = {
  getListFunction: async (): Promise<FunctionTypeOption[]> => {
    log.debug("API 기능 선택 목록 조회 ");
    const res = await api.get(`/project/function`);
    log.debug("데이터 확인!!!", res.data);
    return res.data;
  },
  postProject: async (data: CreateProject): Promise<void> => {
    log.debug("api 기능 추가. data: ", data);
    return await api.post(`/project`, data);
  },
  getProjectFunctions: async (projectId: string): Promise<ProjectFunctionItem[]> => {
    log.debug("API 프로젝트 기능 목록 조회 ");
    const res = await api.get(`/project/${projectId}/function`);
    log.info("프로젝트 기능 목록 데이터 ", res.data);
    return res.data;
  }
};

export default ProjectApi;
