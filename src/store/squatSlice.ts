import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SquatState {
  totalSquats: number;
  dailyGoal: number;
  bestStreak: number;
  lastSessionDate: string | null; 
}

const initialState: SquatState = {
  totalSquats: 0,
  dailyGoal: 30,
  bestStreak: 0,
  lastSessionDate: null,  
};

const squatSlice = createSlice({
  name: 'squats',
  initialState,
  reducers: {
    updateSquatCount: (state, action: PayloadAction<number>) => {
      state.totalSquats += action.payload;
      state.lastSessionDate = new Date().toISOString();
    },
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },
    updateBestStreak: (state, action: PayloadAction<number>) => {
      state.bestStreak = Math.max(state.bestStreak, action.payload);
    },
  },
});

export const { updateSquatCount, setDailyGoal, updateBestStreak } = squatSlice.actions;
export default squatSlice.reducer;
