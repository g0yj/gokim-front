
export interface ProjectMembers {
    projectMembers: string;
    projectMemberName: string;
    role: string;
}

export interface Project {
    id: string;
    projectName: string;
    ownerName: string;
    ProjectMembers: ProjectMembers[]
}