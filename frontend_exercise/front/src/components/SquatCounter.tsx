import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useApiCall } from '../hooks/useApiCall';
import { getUserSquatStats, SquatStats } from '../services/apiserver';

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Count = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #4a4a4a;
`;

const Progress = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #666;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const ProgressFill = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
`;

interface SquatCounterProps {
  count: number;
  todayCount: number;
  dailyGoal: number;
}



const SquatCounter: React.FC<SquatCounterProps> = ({ count, todayCount, dailyGoal }) => {
  const { callApi: fetchStats, loading, error } = useApiCall<SquatStats>(getUserSquatStats);

  useEffect(() => {
    const loadStats = async () => {
      try {
        await fetchStats();
      } catch (err) {
        console.error('Failed to fetch squat stats:', err);
      }
    };

    loadStats();
  }, [fetchStats]);

  const progressPercentage = Math.min((todayCount / dailyGoal) * 100, 100);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching stats: {error}</p>;

  return (
    <CounterContainer>
      <Count>{count}</Count>
      <Progress>
        Today's Progress: {todayCount} / {dailyGoal}
      </Progress>
      <ProgressBar>
        <ProgressFill width={progressPercentage} />
      </ProgressBar>
    </CounterContainer>
  );
};

export default SquatCounter;
