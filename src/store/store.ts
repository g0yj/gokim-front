import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// redux-persist 관련 import
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage 사용

// 🔒 persist 설정
const persistConfig = {
  key: "root", // localStorage에 저장될 key 이름 (root: 기본값)
  storage, // 사용할 storage (여기선 localStorage)
  whitelist: ["auth"], // 어떤 reducer를 저장할지 선택 (여기선 auth만)
};

// 🔁 auth reducer에 persist 적용
const persistedReducer = persistReducer(persistConfig, authReducer);

// 🏗️ Redux store 생성
export const store = configureStore({
  reducer: {
    auth: persistedReducer, // persist 적용된 reducer 사용
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 warning 방지용
    }),
});

// 🧊 persistor 객체 생성 (index.tsx에서 PersistGate와 함께 사용됨)
export const persistor = persistStore(store);

// 🔎 타입 설정
export type RootState = ReturnType<typeof store.getState>; // 전체 state 타입 추론
export type AppDispatch = typeof store.dispatch; // dispatch 타입 추론

export default store;
