import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setWalletConnection, disconnectWallet, setAuthToken, setWalletSigned } from "../store/authSlice";
import { authenticateWallet } from "../services/authService";
import styled from "styled-components";
import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";
import bs58 from "bs58";

// ✅ Styled Components 추가
const WalletButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WalletAddress = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
  font-size: 14px;
`;

const LoadingMessage = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
`;

// ✅ AuthResponse 타입 추가
interface AuthResponse {
  message?: string;
  token?: string;
  accessToken?: string;
  jwt?: string;
  error?: string;
}

// ✅ WalletConnection 컴포넌트
const WalletConnection: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const { walletConnected, isSigned, jwtToken } = useSelector((state: RootState) => state.auth);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ 앱 로드 시 Redux 상태 확인 후 자동 연결
  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      dispatch(
        setWalletConnection({
          connected: true,
          address: wallet.publicKey.toBase58(),
        })
      );
      console.log("✅ Redux 상태 업데이트: 지갑 연결됨");
    } else {
      dispatch(disconnectWallet());
      console.log("⚠️ Redux 상태 업데이트: 지갑 연결 해제됨");
    }
  }, [wallet.connected, wallet.publicKey, dispatch]);

  // ✅ 지갑 연결 핸들러 (Phantom 선택)
  const handleConnect = async () => {
    try {
      if (!wallet.connected) {
        const availableWallets = wallet.wallets.map(w => w.adapter.name);
        console.log("🟣 사용 가능한 지갑 목록:", availableWallets);

        const phantomWallet = wallet.wallets.find(w => w.adapter.name === "Phantom");

        if (!phantomWallet) {
          console.error("❌ Phantom 지갑이 감지되지 않았습니다.");
          setErrorMessage("Phantom 지갑이 감지되지 않았습니다. 설치 후 다시 시도하세요.");
          return;
        }

        console.log("🔹 Phantom 지갑 선택 중...");
        await wallet.select(phantomWallet.adapter.name as WalletName<string>);
        await new Promise(resolve => setTimeout(resolve, 500)); // ✅ 약간의 딜레이 추가

        console.log("🔹 Phantom 지갑 연결 중...");
        await wallet.connect();
        setErrorMessage(null);
        console.log("✅ Phantom 지갑 연결 성공");
      }
    } catch (error) {
      console.error("❌ 지갑 연결 실패:", error);
      setErrorMessage("지갑 연결에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // ✅ 메시지 서명 및 인증 핸들러
  const handleAuthenticate = async () => {
    try {
      console.log("🚀 인증 시작");

      if (!wallet.connected || !wallet.publicKey) {
        console.error("🚨 지갑이 연결되지 않음!");
        setErrorMessage("지갑이 연결되지 않았습니다. 먼저 연결해주세요.");
        return;
      }

      console.log("🔹 서명 가능한지 확인...");
      if (!wallet.signMessage) {
        console.error("❌ 현재 지갑에서 메시지 서명을 지원하지 않습니다.");
        setErrorMessage("현재 사용 중인 지갑에서는 메시지 서명이 지원되지 않습니다.");
        return;
      }

      const message = `Sign this message: ${new Date().toISOString()}`;
      const encodedMessage = new TextEncoder().encode(message);

      console.log("📝 서명 요청 보냄...");
      const signedMessage = await wallet.signMessage(encodedMessage);

      console.log("✅ 서명 성공:", signedMessage);

      // ✅ 서명 데이터 변환 후 백엔드 인증 요청
      const publicKey = wallet.publicKey.toBase58();
      const signature = bs58.encode(signedMessage);

      console.log("🔹 서버에 인증 요청...");
      const response = (await authenticateWallet({ publicKey, message, signature })) as AuthResponse;

      if (response?.token) {
        dispatch(setAuthToken(response.token));
        dispatch(setWalletSigned(true));
        sessionStorage.setItem("jwtToken", response.token); // ✅ 추가: SessionStorage 저장
        console.log("✅ 인증 성공! Redux 상태 업데이트");
        alert("✅ 인증 성공! Ex2Earn을 이용할 수 있습니다.");
      } else {
        console.error("❌ 잘못된 응답 형식:", response);
        setErrorMessage(response.error || "❌ 인증 실패: 서버 응답이 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("❌ 서명 실패:", error);
      setErrorMessage("서명 중 오류가 발생했습니다. 다시 시도해주세요.");
      dispatch(setWalletSigned(false));
    }
  };

  // ✅ 지갑 연결 해제 핸들러
  const handleDisconnect = async () => {
    try {
      await wallet.disconnect();
      dispatch(disconnectWallet());
      dispatch(setWalletSigned(false));
      sessionStorage.removeItem("jwtToken"); // ✅ SessionStorage 삭제 추가
      setErrorMessage(null);
      console.log("⚠️ 지갑 연결 해제됨");
    } catch (error) {
      console.error("❌ 지갑 연결 해제 실패:", error);
      setErrorMessage("지갑 연결 해제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <WalletButton onClick={handleConnect}>지갑 연결</WalletButton>
      ) : (
        <WalletInfo>
          {wallet.publicKey ? (
            <WalletAddress>
              {wallet.publicKey.toBase58().slice(0, 4)}...
              {wallet.publicKey.toBase58().slice(-4)}
            </WalletAddress>
          ) : (
            <WalletAddress>🔹 지갑 연결 필요</WalletAddress>
          )}
          <WalletButton onClick={handleAuthenticate}>메시지 서명 후 인증</WalletButton>
          <WalletButton onClick={handleDisconnect}>연결 해제</WalletButton>
        </WalletInfo>
      )}
      {loading && <LoadingMessage>⏳ 인증 진행 중...</LoadingMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default WalletConnection;
