import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  walletConnected: boolean;
  walletAddress: string | null;
  isAuthenticated: boolean;
  isSigned: boolean;  
  jwtToken: string | null;
}

const initialState: AuthState = {
  walletConnected: false,
  walletAddress: null,
  isAuthenticated: false,
  isSigned: false,  
  jwtToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWalletConnection: (state, action: PayloadAction<{ connected: boolean; address: string }>) => {
      state.walletConnected = action.payload.connected;
      state.walletAddress = action.payload.address;
    },
    disconnectWallet: (state) => {
      state.walletConnected = false;
      state.walletAddress = null;
      state.isAuthenticated = false;
      state.isSigned = false;
      state.jwtToken = null;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
      state.isAuthenticated = true;
    },
    setWalletSigned: (state, action: PayloadAction<boolean>) => { 
      state.isSigned = action.payload;
    }
  },
});

export const { setWalletConnection, disconnectWallet, setAuthToken, setWalletSigned } = authSlice.actions;
export default authSlice.reducer;
