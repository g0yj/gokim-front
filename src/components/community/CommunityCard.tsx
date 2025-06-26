import communtiyImg from '@/assets/communityImg.png'


const CommunityCard = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 border-2 p-4 flex flex-col items-center mb-4">
      <div>
        <img src={communtiyImg} className="w-20 h-20" />
      </div>
      <div className="w-full flex-col">
        <div className="flex-1 text-left">제목</div>
        <div className="flex-1 text-right">스크랩</div>
      </div>
    </div>
  );
};

export default CommunityCard;