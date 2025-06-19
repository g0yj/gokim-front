/**
 *  Redux Toolkit -> Redux를 더 쉽고 빠르고 에러 없이 사용할 수 있게 도와주는 Wrapper 라이브러리
 *  - createSlice() 로 자동 생성
 *  - createSlice() 안에 객체로 reducer 정의
 *  - createAsyncThunk() 하나로 처리
 *  - configureStore() 로 간단히 구성
 * 
 * ======================================================================================
 *  slice : 특정 도메인(state 조각)에 대한 상태 + 액션 묶음
 *  reducer : 상태를 변경하는 로직
 *  action : reducer를 호출하는 명령 (dispatch할 대상)
 *  store : 모든 상태를 저장하는 중앙 저장소
 *  dispatch : 상태 변경을 발생시키는 함수
 *  useSelector : store에 있는 상태를 꺼내오는 hook
 *  useDispatch : 액션을 보내는 hook (-> 상태를 바꿈)
 * 
 * ====================================================================================
 *  dispatch() 란?
 *  -> Redux 상태를 바꾸기 위해 반드시 거쳐야 하는 함수. 
 *    Redux에서는 상태(state)를 직접 바꾸면 안되고, 액션이라는 걸 dispatch해서 간접적으로 바꿔야함!
 *  예 ) dispatch(setLogin({ userId: 'tubi', accessToken: 'abc', ... }))
 */