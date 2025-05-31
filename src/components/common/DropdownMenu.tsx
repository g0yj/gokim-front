import { useEffect, useState } from "react";

interface DropdownMenuProps<T> {
  title: string; // 드롭다운 버튼에 표시할 텍스트
  fetchUrl: string; // API 주소
  renderItem?: (item: T) => React.ReactNode; // 각 항목을 어떻게 표시할지 커스터마이징하는 함수
  onItemClick?: (item: T) => void; // 항목을 클릭했을 때 실행할 콜백
  className?: string; // 외부에서 전달한 추가 스타일 클래스
}

  /**
        const DropdownMenu = <T extends { id: string | number }>(
        props: DropdownMenuProps<T>
        ) => {
            // 함수 내용
        };
   */
  function DropdownMenu<T extends { id: string | number}>({
  title,
  fetchUrl,
  renderItem,
  onItemClick,
  className = "",
}: DropdownMenuProps<T>) {
      
      // 여기부터가 찐 메서드
  const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열려있는지 여부
  const [items, setItems] = useState<T[]>([]); //API로 가져온 항목 데이터

    // 드롭다운 열기/닫기를 토글하는 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && items.length === 0) {
      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error("Failed to fetch items", err));
    }
  }, [isOpen, fetchUrl]);

  return (
    <div className={`dropdown ${className}`}>
      <button onClick={toggleDropdown}>{title}</button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className="dropdown-item"
            >
              {renderItem ? renderItem(item) : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
