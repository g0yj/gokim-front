import { BasicSideBarItem } from "@/types/common/sideBar";
import DragDropItem from "./DragDropItem";
import { useCallback, useState } from "react";

export type BasicSideBarProps = {
    items: BasicSideBarItem[] ;
    onUpdateSort: (sortedItems: BasicSideBarItem[]) => void;
}

const BasicSideBar: React.FC<BasicSideBarProps> = ({ items, onUpdateSort }) => {
    const [sidebarItems, setSidebarItems] = useState<BasicSideBarItem[]>(items);

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        const updatedItems = [...sidebarItems];
        const [movedItem] = updatedItems.splice(dragIndex, 1);
        updatedItems.splice(hoverIndex, 0, movedItem);
        setSidebarItems(updatedItems);
        onUpdateSort(updatedItems); // 외부로 갱신 필요시
  }, [sidebarItems, onUpdateSort]);

    return (
        <div style={{ padding: 20 }}>
            {sidebarItems.map((item, index) => (
                <DragDropItem
                key={item.id}
                id={item.id}
                type="sidebarItem"
                index={index}
                moveItem={moveItem}
                style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}
                >
                {item.content}
                </DragDropItem>
            ))}
    </div>
    )
}

export default BasicSideBar;

