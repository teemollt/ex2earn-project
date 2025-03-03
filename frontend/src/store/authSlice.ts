// src/store/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isConnected: boolean;
  walletAddress: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isConnected: false,
  walletAddress: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWalletConnection: (state, action: PayloadAction<{ isConnected: boolean; address: string | null }>) => {
      state.isConnected = action.payload.isConnected;
      state.walletAddress = action.payload.address;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.walletAddress = null;
    },
  },
});

export const { setWalletConnection, disconnectWallet } = authSlice.actions;
export default authSlice.reducer;
