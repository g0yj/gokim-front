import log from "@/lib/logger";
import { useState } from "react";

interface SidebarProps<T> {
  initialItems: T[];
  renderItem: (item: T) => React.ReactNode;
  bgColor: string;
  idKey: keyof T; // T의 키 중 하나로 식별자 역할을 하는 키
}

const CustomSideBar = <T,> ({
    initialItems,
    renderItem,
    bgColor,
    idKey,
}: SidebarProps<T>) => {
    log.debug('사이드바 컴포넌트 실행');

    const [items, setItems] = useState<T[]>(initialItems);


    return (
        <div>사이드바</div>
    );
  }


export default CustomSideBar;