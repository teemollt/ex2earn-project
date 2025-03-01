import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const DashboardContainer = styled.div`
  padding: ${theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.medium};
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.medium};
  box-shadow: ${theme.boxShadow};
`;

const StatTitle = styled.h2`
  font-size: 1.2em;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small};
`;

const StatValue = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: ${theme.colors.secondary};
`;

const Dashboard: React.FC = () => {
  const { walletAddress } = useSelector((state: RootState) => state.auth);
  const { totalSquats, dailyGoal, bestStreak, lastSessionDate } = useSelector((state: RootState) => state.squats);

  return (
    <DashboardContainer>
      <Title>Your Squat Challenge Dashboard</Title>

      <StatCard>
        <StatTitle>Connected Wallet</StatTitle>
        <StatValue>{walletAddress || 'Not connected'}</StatValue>
      </StatCard>

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
