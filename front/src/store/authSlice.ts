import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  walletConnected: boolean;
  walletAddress: string | null;
  isAuthenticated: boolean;
  isSigned: boolean;
  jwtToken: string | null;
}

// ✅ Redux 초기 상태 (SessionStorage에서 JWT 불러오기 추가)
const initialState: AuthState = {
  walletConnected: false,
  walletAddress: null,
  isAuthenticated: sessionStorage.getItem("jwtToken") !== null, // ✅ JWT가 있으면 인증 상태 유지
  isSigned: false,
  jwtToken: sessionStorage.getItem("jwtToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setWalletConnection: (state, action: PayloadAction<{ connected: boolean; address: string | null }>) => {
      state.walletConnected = action.payload.connected;
      state.walletAddress = action.payload.address || null;
      console.log("🔹 Redux: 지갑 연결 상태 업데이트", state);
    },

    disconnectWallet: (state) => {
      state.walletConnected = false;
      state.walletAddress = null;
      state.isAuthenticated = false;
      state.isSigned = false;
      state.jwtToken = null;
      sessionStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtToken"); // ✅ LocalStorage에서도 삭제
      console.log("⚠️ Redux: 지갑 연결 해제됨");
    },

    setAuthToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("jwtToken", action.payload);
      localStorage.setItem("jwtToken", action.payload); // ✅ LocalStorage에도 저장
      console.log("🔹 Redux: JWT 토큰 저장됨", state);
    },

    setWalletSigned: (state, action: PayloadAction<boolean>) => {
      state.isSigned = action.payload;
      console.log("🔹 Redux: 메시지 서명 상태 업데이트", state);
    },
  },
});

export const { setWalletConnection, disconnectWallet, setAuthToken, setWalletSigned } = authSlice.actions;
export default authSlice.reducer;
