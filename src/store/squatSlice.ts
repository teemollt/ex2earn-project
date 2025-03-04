import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface SquatState {
  totalSquats: number;
  dailyGoal: number;
  bestStreak: number;
  todayCount: number;
  lastCompletionDate: string | null;
  lastSessionDate: string | null;
  streak: number;
}

const initialState: SquatState = {
  totalSquats: 0,
  dailyGoal: 30,
  bestStreak: 0,
  todayCount: 0,
  lastCompletionDate: null,
  lastSessionDate: null,
  streak: 0,
};

const squatSlice = createSlice({
  name: 'squats',
  initialState,
  reducers: {
    updateSquatCount: (state, action: PayloadAction<number>) => {
      const today = new Date().toISOString().split('T')[0];
      if (state.lastCompletionDate !== today) {
        state.todayCount = 0;
      }
      state.totalSquats += action.payload;
      state.todayCount += action.payload;
    },
    completeChallenge: (state, action: PayloadAction<string>) => {
      const completionDate = action.payload;
      if (state.lastCompletionDate === completionDate) {
        return;
      }
      state.lastCompletionDate = completionDate;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      if (state.lastCompletionDate === yesterdayStr) {
        state.streak += 1;
      } else {
        state.streak = 1;
      }
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    },
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },
    setDashboardData: (state, action: PayloadAction<Partial<SquatState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSquatCount, completeChallenge, setDailyGoal, setDashboardData } = squatSlice.actions;
export default squatSlice.reducer;
