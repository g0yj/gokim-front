import log from "@/lib/logger";
import ProjectService from "@/services/projectService";
import { BasicSideBarItem } from "@/types/common/sideBar";
import { ProjectFunctionItem } from "@/types/project"
import { useEffect, useState } from "react"
import { BasicSideBarProps } from "../common/BasicSideBar";

const ProjectSideBar: React.FC<{ projectId: string }> = ({projectId}) => {
    const [projectFunctions, setProjectFunctions] = useState<BasicSideBarItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            log.debug("프로젝트 사이드바 useEffect 실행");
            try {
                const res = await ProjectService.projectFuncsions(projectId);

            } catch (err) {
                log.error("프로젝트 기능 axios 호출 실패", err);
            }
        }
    })


    
    return (
        <div></div>
    )
}

export default ProjectSideBar;