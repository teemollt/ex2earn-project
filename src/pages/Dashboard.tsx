import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styled from 'styled-components';
import { CONFIG } from '../config';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${CONFIG.COLORS.TEXT};
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h2`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${CONFIG.COLORS.PRIMARY};
`;

const WalletInfo = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Dashboard: React.FC = () => {
  const { walletAddress } = useSelector((state: RootState) => state.auth);
  const { totalSquats, dailyGoal, bestStreak, lastSessionDate } = useSelector((state: RootState) => state.squats);

  return (
    <DashboardContainer>
      <Title>Your Squat Challenge Dashboard</Title>
      <WalletInfo>
        <StatTitle>Connected Wallet</StatTitle>
        <StatValue>{walletAddress || 'Not connected'}</StatValue>
      </WalletInfo>
      <StatCard>
        <StatTitle>Daily Goal</StatTitle>
        <StatValue>{dailyGoal} squats</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Total Squats</StatTitle>
        <StatValue>{totalSquats}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Best Streak</StatTitle>
        <StatValue>{bestStreak} days</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Last Session</StatTitle>
        <StatValue>{lastSessionDate || 'No sessions yet'}</StatValue>
      </StatCard>
    </DashboardContainer>
  );
};

export default Dashboard;
