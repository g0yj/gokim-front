export interface Issue {
  id: string;
  content:string;
}

export interface IssueType {
  id: string;
  title: string;
  description: string;
};

export interface ColumnProps {
  title: string;
  issues: Issue[];
}


export interface ColumnType {
  id: string;
  title: string;
  issues: Issue[];
}

export interface BoardData {
  columns: {
    [key: string]: ColumnType;
  };
  columnOrder: string[];
}


