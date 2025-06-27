import log from "@/lib/logger";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

interface SidebarProps<T> {
  initialItems: T[];
  renderItem: (item: T) => React.ReactNode;
  bgColor: string;
  idKey: keyof T; // T의 키 중 하나로 식별자 역할을 하는 키(상위 컴포넌트에서 식별키 전달해서 사용하기)
  onSortEnd: (items: T[]) => void;
}

const CustomSideBar = <T,> ({
    initialItems,
    renderItem,
    bgColor,
    idKey,
    onSortEnd
}: SidebarProps<T>) => {
    log.debug('사이드바 컴포넌트 실행');

    const [items, setItems] = useState<T[]>(initialItems);

    const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);

    // 콜백 함수를 통해 상위 컴포넌트에 정렬된 아이템을 전달
    onSortEnd(reorderedItems);
  };


    return (
        <aside className={`w-64 h-full ${bgColor}`}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="sidebar-item-list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                const key = item[idKey] as string;
                return (
                  <Draggable key={key} draggableId={key} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderItem(item)}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </aside>
    );
  }


export default CustomSideBar;