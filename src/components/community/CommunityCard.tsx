import communityImg from '@/assets/communityImg.png'
import { ListCommunityItem } from '@/types/community';
import scrappedIcon from "@/assets/trueScrapped.png"
import notScrappedIcon from "@/assets/falseScrapped.png";
import log from '@/lib/logger';
import React from 'react';

type CommunityCardProps = {
  data: ListCommunityItem;
  onClick?: () => void; // 상세조회 Link로 접근 
  onScrap?: () => void; // 수정메서드
}

const CommunityCard = (
  {
    data,
    onClick,
    onScrap,
  }: CommunityCardProps) => {
  
  const handleScrapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    log.debug('Card컴포넌트에서 click 메서드 실행');
    e.stopPropagation(); // 부모(card) 클릭 방지
    // onScrap : 함수 그 자체를 참조 (=존재 여부를 체크)
    if (onScrap) {
      onScrap();
    } else {
      log.warn('onScrap 존재하지 않음');
    }
  }

  return (
    <div
      className="w-full md:w-1/2 lg:w-1/4 border-2 p-4 flex flex-col items-center mb-4 cursor-pointer"
      onClick={
        onClick
          ? onClick
          : () => { log.warn('props에 onclick 없음') }} // 안전한 기본값 설정
    >
      <div>
        <img src={communityImg} className="w-20 h-20" alt="Community" />
      </div>
      <div className="w-full flex flex-row justify-between items-center mb-2">
        <div className="text-left">
          {data.title}
        </div>
      </div>
      <div className="w-full flex flex-row justify-end items-center">
        <img
          src={data.isScrapped ? scrappedIcon : notScrappedIcon}
          className="w-5 h-5"
          onClick={handleScrapClick}
        />
      </div>
    </div>
  );
};

export default CommunityCard;

/**
  ✅ 구조 해석
  React.MouseEvent<T>
  React가 제공하는 이벤트 타입 중 하나야.

  MouseEvent는 클릭, 더블클릭, 마우스오버 등 마우스로 발생하는 이벤트를 처리할 때 사용돼.

  <HTMLImageElement> 부분
  <T> 제네릭 부분에 이벤트가 발생한 HTML 요소 타입을 넣는 거야.

  여기서 HTMLImageElement는 <img> 요소를 의미함.

  즉, React.MouseEvent<HTMLImageElement>는
  이미지 요소에서 발생한 마우스 이벤트 객체 타입이야.
 */