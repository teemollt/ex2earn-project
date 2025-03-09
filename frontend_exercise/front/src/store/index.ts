import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import squatReducer from './squatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    squats: squatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
