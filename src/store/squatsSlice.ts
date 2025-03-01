import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CONFIG } from '../config';

interface SquatsState {
  totalSquats: number;
  dailyGoal: number;
  bestStreak: number; 
  lastSessionDate: string;
}

const initialState: SquatsState = {
    totalSquats: 0,
    dailyGoal: CONFIG.DEFAULT_DAILY_GOAL,
    bestStreak: 0,
    lastSessionDate: '',
  };

const squatsSlice = createSlice({
  name: 'squats',
  initialState,
  reducers: {
    setSquatsData: (state, action: PayloadAction<Partial<SquatsState>>) => {
      return { ...state, ...action.payload };
    },
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },
    incrementTotalSquats: (state) => {
      state.totalSquats += 1;
    },
  },
});

export const { setSquatsData, setDailyGoal, incrementTotalSquats } = squatsSlice.actions;
export default squatsSlice.reducer;
