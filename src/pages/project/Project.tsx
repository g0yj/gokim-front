const Project = () => {
    console.log(`프로젝트 페이지 실행`);
    
    return (
        <div>
            <h3>프로젝트 목록을 만들거임. </h3>
            <ul>
                <li>
                    필터링 기능 할거임. 프로젝트 이름이랑 참여인원에 따람<br />
                </li>
                <li>
                    컴포넌트로 프로젝트 목록 가져올거임. 참여 인원이랑 주최자인 경우, 혼자일 경우에 따라 다른 이미지를 넣을 예정
                </li>
                <li>
                    프로젝트 생성 버튼 필요 . 모달창 사용 예정.
                </li>

            </ul>
            

        </div>
        
    );
};

export default Project;