import communtiyImg from '@/assets/communityImg.png'
import { ListCommunityItem } from '@/types/community';
import scrappedIcon from "@/assets/trueScrapped.png"
import notScrappedIcon from "@/assets/falseScrapped.png";
import log from '@/lib/logger';

interface CommunityCardProps {
  data: ListCommunityItem;
  onClick ?: () => void;
}

const CommunityCard = ({data ,onClick}:CommunityCardProps) => {

  return (
    <div
      className="w-full md:w-1/2 lg:w-1/4 border-2 p-4 flex flex-col items-center mb-4 cursor-pointer"
      onClick={onClick ? onClick : () => {log.warn('props에 onclick 없음')} } // 안전한 기본값 설정
    >
      <div>
        <img src={communtiyImg} className="w-20 h-20" alt="Community" />
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
          alt={data.isScrapped ? 'Scrapped' : 'Not Scrapped'}
        />
      </div>
    </div>
  );
};

export default CommunityCard;