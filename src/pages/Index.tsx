import { useEffect, useState } from "react";
// import Column from "../components/Board/Column";
import IssueCard from "../components/Board/IssueCard";
import { initialData } from "../data/mockBoardData";
import { Project } from "../types/member";
import { BoardData, ColumnType, Issue } from "../types/board";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const reorder = (list: Issue[], startIndex: number, endIndex: number): Issue[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};


const Index = () => {





  return (
    <h3>메인 페이지</h3>
  );
};

export default Index;
