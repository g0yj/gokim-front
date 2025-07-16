import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';

type DragDropItemProps = {
    id: number | string; // 아이템을 구별하여 이벤트 발생 시 이동을 파악
    type: string; // 특정 유형의 아이템만 특정 영역으로 드롭할 수 있도록 관리 (서로 다른 유형으론 이동되지 않도록 제어 가능)
    index?: number;  // 드래그된 아이템의 인덱스
    // moveItem과 onDrop의 차이??
    moveItem?: (dragIndex: number, hoverIndex: number) => void; // 간단한 인덱스 조절로 아이템 재배치를 처리
    onDrop?: (item: {id: number | string}) => void; // 드롭 후 전체 리스트의 최종 상태를 관리하고, 외부 시스템에 전달해야 하는 작업을 수행
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const DragDropItem: React.FC<DragDropItemProps> = ({
    id,
    type,
    index,
    moveItem,
    onDrop,
    style,
    children
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag]  = useDrag({
        type,
        item: {id},
        // 드래그 상태의 정보를 추적 (드래그 중인지 여부를 추적. 시각적으로 드래그 중인 아이템을 표시하거나 다른 스타일 적용 가능)
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(), // 드래그 중인지 여부에 따른 상태 수집
        }),
    });

   const [, drop] = useDrop({
        accept: type,
        hover(item: { id: number | string; index: number }) {
            if (!ref.current) return;
            // undefined 사용 이유 : props를 :? 로 받는 중
            if (moveItem && typeof index !== 'undefined' && item.index !== index) {
                moveItem(item.index, index);
                item.index = index;
            }
        },
        drop: (droppedItem) => {
            if(onDrop) {
                onDrop(droppedItem as { id: number | string });
            }
        },
    });

    // drag와 drop을 통합하기 위해 사용.
    useEffect(() => {
        if(ref.current) {
            drag(drop(ref.current)); //ref를 통해 실제 DOM에 가할 드래그 및 드롭 설정
        }
    }, [drag, drop])
    return (
        <div ref={ref} style={{
             ...style, 
             opacity: isDragging ? 0.5 : 1 // opacity: 불투명도 
             }}>
            {children}
        </div>
    )
}

export default DragDropItem;

/** 
 * moveItem과 onDrop의 차이??
  
`moveItem`은 주로 리스트 내에서 아이템의 순서를 변경하기 위한 즉시적인 로직을 처리하며, `onDrop`은 드래그 앤 드랍 시 전체적인 후처리를 담당합니다.

### `onDrop`의 역할과 필요성

- **역할**:
  - `onDrop`은 아이템이 드롭될 때마다 발생하는 후속 작업을 처리합니다.
  - 드롭된 아이템의 최종 위치를 확인하고, 이를 기반으로 상태를 갱신하거나 외부 저장 매체(예: 서버)에 변경 사항을 전송할 수 있습니다.
  - 필요할 때는 상태를 리셋하는 등 다양한 후처리 작업에 사용될 수 있습니다.

- **사용 시점**:
  - 리스트 전체를 업데이트하거나, 드롭 여부 및 위치에 따라 상태를 변경할 필요가 있을 때 적합합니다.
  - 예를 들어 Todo 리스트에서는 아이템을 드래그해서 리스트 간 이동이 가능하거나, 상태(예: 완료됨, 진행중)을 변경하는 데 이용될 수 있습니다.

### 예시 - Todo 리스트에서 사용되는 경우

1. **`moveItem` 간단한 순서 변경**: 아이템이 리스트 내에서 위치를 바꿀 때마다 즉시적 순서 변경을 처리.

2. **`onDrop` 리스트 및 외부 저장 상태 업데이트**:
   - 아이템이 최종적으로 어디에 놓였는지에 따라 전체 상태를 리프레시 하거나 데이터베이스에 반영.

tsx
Copy
const TodoItemComponent: React.FC = () => {
  const updateItemStatus = (item) => {
    // 아이템이 드롭된 이후 완료됨 상태로 변경하고 서버에 전송하는 로직
    console.log(`Item dropped: ${item.id}`);
    // 서버 등 외부로 상태 변경 콜잉 등
  };

  const moveItemLocal = (dragIndex, hoverIndex) => {
    // 리스트 내부에서 간단 순서 변경
  };

  return (
    <TodoList>
      {items.map((item, index) => (
        <DragDropItem
          key={item.id}
          id={item.id}
          index={index}
          type="todoItem"
          moveItem={moveItemLocal}
          onDrop={updateItemStatus}
          style={{ borderBottom: "1px solid grey", padding: '10px' }}
        >
          {item.content}
        </DragDropItem>
      ))}
    </TodoList>
  );
};

### 결론:
- **moveItem**은 간단한 인덱스 조절로 아이템 재배치를 처리합니다.
- **onDrop**은 드롭 후 전체 리스트의 최종 상태를 관리하고, 외부 시스템에 전달해야 하는 작업을 수행합니다.
 */