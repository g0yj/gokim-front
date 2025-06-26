import ButtonPage from '@/mock/ButtonPage';
import female from '../assets/female.png'; 

const Index = () => {


  return (
    <div className=" min-h-screen">
      
      {/* ✅ 완전히 바깥에서 w-full 처리 */}
      <div
        className="relative left-1/2 w-screen -translate-x-1/2 py-40 text-center text-white"
        style={{backgroundColor: '#161C24' }}
      >
        <div className="bg-[#161C24] h-[20px] flex items-center">
          {/* ✅ 왼쪽 캐릭터 박스 */}
          <div className="w-[200px] h-[260px] md:flex-1 flex items-center justify-center">
            <img src={female} alt="캐릭터" className="w-[150px] h-[150px]" />
          </div>
          <div>
            <h3 className='md:flex-1 '
            
            ></h3>
          </div>
        </div>

      </div>

      {/* ✅ 중앙정렬된 본문 콘텐츠 */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">메인 페이지</h1>
        <ButtonPage/>
      </div>

    </div>
  );
};

export default Index;


/**
   w-screen	브라우저 전체 너비 기준
  left-1/2	부모 기준 왼쪽에서 50% 이동 (중앙 anchor)
  -translate-x-1/2	그걸 다시 절반만큼 왼쪽으로 이동 → 정중앙에 w-screen 박스 생성
  relative	left-1/2를 쓰기 위해 필요
  py-3	위아래 여백
  text-center	가운데 정렬 텍스트
 */