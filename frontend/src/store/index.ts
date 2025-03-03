import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import squatsReducer from './squatsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    squats: squatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
