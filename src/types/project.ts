export type ProjectFunctionType =
  | "TASK"
  | "FILE"
  | "BOARD"
  | "CALENDAR"
  | "PAGE";

export interface CreateProject {
  projectName: string;
  projectFunctions: CreateProjectFunction[];
  projectMemberIds?: CreateProjectMemberId[];
}

export type CreateProjectFunction = {
  projectFunctionType: ProjectFunctionType | null ;
  projectFunctionName: string;
  functionSort: number;
  projectExists: boolean;
};

export type CreateProjectMemberId = {
  projectMemberId: string;
};

export type FunctionTypeOption = {
  functionName: string;
  projectFunctionType: ProjectFunctionType;
};

export interface ListProjectFunction {
  projectId:string;
  functions: ProjectFunctionItem[];
}

export type ProjectFunctionItem = {
  projectFunctionId: string | number;
  projectFunctionName: string ;
  projectFunctionSort:  number;
  projectFunctionType: ProjectFunctionType; 
}