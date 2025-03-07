import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setWalletConnection, disconnectWallet, setAuthToken, setWalletSigned } from '../store/authSlice';
import { authenticateWithWallet } from '../services/authService';
import styled from 'styled-components';

const WalletButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WalletAddress = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
`;

const WalletConnection: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const { walletConnected, isAuthenticated, isSigned } = useSelector((state: RootState) => state.auth);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      dispatch(setWalletConnection({
        connected: true,
        address: wallet.publicKey.toBase58()
      }));
    } else {
      dispatch(disconnectWallet()); // ✅ 지갑이 연결되지 않으면 상태 초기화
    }
  }, [wallet.connected, wallet.publicKey, dispatch]);

  const handleConnect = async () => {
    try {
      if (wallet.wallet) {
        await wallet.connect();
      } else {
        wallet.select('phantom' as WalletName<string>);
      }
      setErrorMessage(null);
    } catch (error) {
      console.error('❌ 지갑 연결 실패:', error);
      setErrorMessage('지갑 연결에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDisconnect = async () => {
    try {
      await wallet.disconnect();
      dispatch(disconnectWallet());
      setErrorMessage(null);
    } catch (error) {
      console.error('❌ 지갑 연결 해제 실패:', error);
      setErrorMessage('지갑 연결 해제 중 오류가 발생했습니다.');
    }
  };

  const handleAuthenticate = async () => {
    try {
      if (!wallet.connected || !wallet.publicKey) {
        await handleConnect();
        return;
      }

      const token = await authenticateWithWallet(wallet);
      if (typeof token === 'string') {
        dispatch(setAuthToken(token));
        dispatch(setWalletSigned(true)); // ✅ 서명 완료 상태 저장
        setErrorMessage(null);
        alert('✅ 인증 성공! 이제 Ex2Earn 서비스를 이용할 수 있습니다.');
      } else {
        throw new Error('서버에서 반환된 토큰 형식이 잘못되었습니다.');
      }
    } catch (error) {
      console.error('❌ 인증 실패:', error);
      setErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <WalletButton onClick={handleConnect}>
          지갑 연결
        </WalletButton>
      ) : (
        <WalletInfo>
          <WalletAddress>
            {wallet.publicKey?.toBase58().slice(0, 4)}...
            {wallet.publicKey?.toBase58().slice(-4)}
          </WalletAddress>
          {!isSigned ? (
            <WalletButton onClick={handleAuthenticate}>
              메시지 서명 후 인증
            </WalletButton>
          ) : (
            <WalletButton onClick={handleDisconnect}>
              연결 해제
            </WalletButton>
          )}
        </WalletInfo>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default WalletConnection;
