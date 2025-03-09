import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';
import WalletConnection from '../components/WalletConnection';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: ${props => props.theme.colors.primary};
`;

const Description = styled.p`
  margin-bottom: 30px;
  line-height: 1.6;
`;

const ConnectWallet: React.FC = () => {
  const { isAuthenticated, isSigned } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && isSigned) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container>
      <Title>Ex2Earn에 오신 것을 환영합니다</Title>
      <Description>
        Ex2Earn은 운동을 통해 암호화폐 보상을 받을 수 있는 플랫폼입니다.
        시작하려면 솔라나 지갑을 연결하고 인증해주세요.
      </Description>
      <WalletConnection />
      {!isSigned && <p>⚠️ 메시지를 서명해야 인증이 완료됩니다.</p>}
    </Container>
  );
};

export default ConnectWallet;
