import { ProjectFunctionItem } from "../project"



export type BasicSideBarItem = {
    id: string | number;
    content: string;
    isMine?: boolean;
    extended: ProjectFunctionItem[];
}