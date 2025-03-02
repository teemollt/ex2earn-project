import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SquatState {
  totalSquats: number;
  dailyGoal: number;
  bestStreak: number;
  todayCount: number;
  lastCompletionDate: string | null;
  lastSessionDate: string | null; // 추가
  streak: number;
}

const initialState: SquatState = {
  totalSquats: 0,
  dailyGoal: 30,
  bestStreak: 0,
  todayCount: 0,
  lastCompletionDate: null,
  lastSessionDate: null, // 초기값 추가
  streak: 0,
};


const squatSlice = createSlice({
  name: 'squats',
  initialState,
  reducers: {
    updateSquatCount: (state, action: PayloadAction<number>) => {
      const today = new Date().toISOString().split('T')[0]; // 오늘 날짜

      // 새로운 날이 시작되었으면 todayCount를 리셋
      if (state.lastCompletionDate !== today) {
        state.todayCount = 0;
      }

      state.totalSquats += action.payload;
      state.todayCount += action.payload;
    },

    completeChallenge: (state, action: PayloadAction<string>) => {
      const completionDate = action.payload;

      // 이미 오늘 완료했다면 중복 처리 방지
      if (state.lastCompletionDate === completionDate) {
        return;
      }

      state.lastCompletionDate = completionDate;

      // 연속 달성 스트릭 계산
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (state.lastCompletionDate === yesterdayStr) {
        state.streak += 1;
      } else {
        state.streak = 1; // 연속 달성이 끊겼으므로 리셋
      }

      // 최고 스트릭 업데이트
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    },

    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },
  },
});

export const { updateSquatCount, completeChallenge, setDailyGoal } = squatSlice.actions;
export default squatSlice.reducer;
