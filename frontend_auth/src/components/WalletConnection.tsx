import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { setWalletConnection, disconnectWallet, setAuthToken, setWalletSigned } from '../store/authSlice';
import { authenticateWithWallet } from '../services/authService';
import { getUserProfile } from '../services/apiService';
import styled from 'styled-components';

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ConnectButton = styled.button`
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

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
`;

const WalletConnection: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walletConnected, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      dispatch(setWalletConnection({
        connected: true,
        address: wallet.publicKey.toBase58()
      }));
    } else {
      dispatch(disconnectWallet());
    }
  }, [wallet.connected, wallet.publicKey, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleConnect = async () => {
    try {
      if (!wallet.connected || !wallet.publicKey) {
        setErrorMessage('지갑을 먼저 연결해주세요.');
        return;
      }

      console.log('인증 시작...');
      const token = await authenticateWithWallet(wallet);
      console.log('인증 성공, 토큰:', token);
      
      dispatch(setAuthToken(token));
      dispatch(setWalletSigned(true));
      
      try {
        const profile = await getUserProfile();
        console.log('프로필 조회 성공:', profile);
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
      
      setErrorMessage(null);
      alert('✅ 인증 성공! 프로필 페이지로 이동합니다.');
    } catch (error) {
      console.error('❌ 인증 실패:', error);
      setErrorMessage('인증에 실패했습니다. 다시 시도해주세요.');
      dispatch(disconnectWallet());
    }
  };

  return (
    <WalletContainer>
      <WalletMultiButton />
      {wallet.connected && !isAuthenticated && (
        <ConnectButton onClick={handleConnect}>
          Connect
        </ConnectButton>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </WalletContainer>
  );
};

export default WalletConnection;
