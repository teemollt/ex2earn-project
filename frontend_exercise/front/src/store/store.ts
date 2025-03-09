import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // ✅ 인증 상태 관리 리듀서
import squatReducer from "./squatSlice"; // ✅ 운동 진행률 상태 리듀서

// ✅ Redux Store 설정
export const store = configureStore({
  reducer: {
    auth: authReducer,
    squats: squatReducer, // ✅ 스쿼트 진행률 관련 상태 추가
  },
});

// ✅ RootState 및 AppDispatch 타입 설정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;