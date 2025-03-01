import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
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
  color: #4CAF50;
`;

const Dashboard: React.FC = () => {
  // 이 데이터는 나중에 백엔드 API나 상태 관리 라이브러리에서 가져올 수 있습니다.
  const totalSquats = 150;
  const bestStreak = 7;
  const lastSessionDate = new Date().toLocaleDateString();

  return (
    <DashboardContainer>
      <Title>Your Squat Challenge Dashboard</Title>
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
        <StatValue>{lastSessionDate}</StatValue>
      </StatCard>
    </DashboardContainer>
  );
};

export default Dashboard;
