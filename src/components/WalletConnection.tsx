import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setWalletConnection, disconnectWallet, setAuthToken } from '../store/authSlice';
import { authenticateWithWallet } from '../services/authService';
import styled from 'styled-components';

const WalletButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
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

const WalletConnection: React.FC = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const { walletConnected, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      dispatch(setWalletConnection({
        connected: true,
        address: wallet.publicKey.toString()
      }));
    }
  }, [wallet.connected, wallet.publicKey, dispatch]);

  const handleConnect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      wallet.select('phantom');
    }    
  };

  const handleDisconnect = async () => {
    if (wallet) {
      await wallet.disconnect();
      dispatch(disconnectWallet());
    }
  };

  const handleAuthenticate = async () => {
    try {
      if (!wallet.connected || !wallet.publicKey) {
        await handleConnect();
        return;
      }

      const token = await authenticateWithWallet(wallet);
      dispatch(setAuthToken(token));
      alert('인증 성공! 이제 Ex2Earn 서비스를 이용할 수 있습니다.');
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('인증에 실패했습니다. 다시 시도해주세요.');
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
            {wallet.publicKey?.toString().slice(0, 4)}...
            {wallet.publicKey?.toString().slice(-4)}
          </WalletAddress>
          {!isAuthenticated ? (
            <WalletButton onClick={handleAuthenticate}>
              인증하기
            </WalletButton>
          ) : (
            <WalletButton onClick={handleDisconnect}>
              연결 해제
            </WalletButton>
          )}
        </WalletInfo>
      )}
    </div>
  );
};

export default WalletConnection;
