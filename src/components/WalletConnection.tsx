import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setWalletConnection, disconnectWallet } from '../store/authSlice';



const StyledWalletMultiButton = styled(WalletMultiButton)`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryHover};
  }
`;

const WalletConnection: React.FC = () => {
  const { wallet, publicKey, disconnect } = useWallet();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (publicKey) {
      dispatch(setWalletConnection({ isConnected: true, address: publicKey.toString() }));
    } else {
      dispatch(setWalletConnection({ isConnected: false, address: null }));
    }
  }, [publicKey, dispatch]);
  

  const handleDisconnect = async () => {
    if (wallet) {
      await disconnect();
      dispatch(disconnectWallet());
    }
  };  
  

  return (
    <>
      <StyledWalletMultiButton />
      {publicKey && (
        <button onClick={handleDisconnect}>Disconnect</button>
      )}
    </>
  );
};

export default WalletConnection;
