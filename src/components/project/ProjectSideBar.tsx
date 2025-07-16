import log from "@/lib/logger";
import ProjectService from "@/services/projectService";
import { BasicSideBarItem } from "@/types/common/sideBar";
import { ProjectFunctionItem } from "@/types/project"
import { useEffect, useState } from "react"
import BasicSideBar, { BasicSideBarProps } from "../common/BasicSideBar";

const ProjectSideBar: React.FC<{ projectId: string }> = ({projectId}) => {
    const [projectFunctions, setProjectFunctions] = useState<BasicSideBarItem[]>([]);

    const handleUpdateSort =  () => {
        log.debug("순서변경 메서드 실행");
        const fetchData = async () => {
            try {

                //await ProjectService.updateProjectFunction(projectId);
            } catch (err) {
                log.error("프로젝트 기능 순서 변경 api 수정", err);
            }

        }

    }
    useEffect(() => {
        log.debug("useEffect실행.. ")
        const fetchData = async () => {
            log.debug("fetchData 실행 ... ");
            try {
                log.debug("try문 실행 ...")
                const res = await ProjectService.projectFuncsions(projectId);

            } catch (err) {
                log.error("프로젝트 기능 axios 호출 실패", err);
            }

            
        }
        fetchData();
    },[projectId])


    
    return (
        <BasicSideBar items={projectFunctions} onUpdateSort={handleUpdateSort} />
    )
}

export default ProjectSideBar;