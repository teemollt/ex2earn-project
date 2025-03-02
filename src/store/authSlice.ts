import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  walletConnected: boolean;
  walletAddress: string | null;
  jwtToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  walletConnected: false,
  walletAddress: null,
  jwtToken: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWalletConnection: (state, action: PayloadAction<{ connected: boolean; address: string | null }>) => {
      state.walletConnected = action.payload.connected;
      state.walletAddress = action.payload.address;
    },
    disconnectWallet: (state) => {
      state.walletConnected = false;
      state.walletAddress = null;
      state.jwtToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    }
  },
});

export const { setWalletConnection, disconnectWallet, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
