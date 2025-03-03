import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useDispatch } from 'react-redux';
import { setWalletConnection } from '../store/authSlice';
import styled from 'styled-components';

const StyledWalletMultiButton = styled(WalletMultiButton)`
  // 여기에 필요한 스타일을 추가할 수 있습니다.
`;

const WalletConnection: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    if (connected && publicKey) {
      dispatch(setWalletConnection({
        isConnected: true,
        address: publicKey.toBase58()
      }));
    } else {
      dispatch(setWalletConnection({
        isConnected: false,
        address: null
      }));
    }
  }, [connected, publicKey, dispatch]);

  return <StyledWalletMultiButton />;
};

export default WalletConnection;
