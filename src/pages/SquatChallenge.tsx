import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { updateSquatCount, completeChallenge } from '../store/squatSlice';
import VideoComponent from '../components/VideoComponent';
import SquatCounter from '../components/SquatCounter';
import RewardModal from '../components/RewardModal';
import { useWallet } from '@solana/wallet-adapter-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;




const SquatChallenge: React.FC = () => {
  const dispatch = useDispatch();
  const { publicKey } = useWallet();

  const [count, setCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const todayCount = useSelector((state: RootState) => state.squats.todayCount);
  const dailyGoal = useSelector((state: RootState) => state.squats.dailyGoal);

  const handlePoseDetected = useCallback((pose: any) => {
    if (pose.isSquatting) {
      setCount(prevCount => prevCount + 1);
      dispatch(updateSquatCount(1));
    }
  }, [dispatch]);

  useEffect(() => {
    if (todayCount >= dailyGoal) {
      setShowCelebration(true);
      dispatch(completeChallenge(new Date().toISOString().split('T')[0]));
    }
  }, [todayCount, dailyGoal, dispatch]);

  const saveSquatDataOnChain = async () => {
    if (!publicKey) {
      console.error('Wallet not connected');
      return;
    }

    try {
      // Save data to blockchain logic
      console.log('Data saved to blockchain');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <Container>
      <Title>Squat Challenge</Title>
      <VideoComponent onPoseDetected={handlePoseDetected} />
      <SquatCounter count={count} todayCount={todayCount} dailyGoal={dailyGoal} />
      {showCelebration && <RewardModal onClose={() => setShowCelebration(false)} onSave={saveSquatDataOnChain} />}
    </Container>
  );
};

export default SquatChallenge;
