import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSquatCount } from '../store/squatSlice';
import { saveSquatDataOnChain } from '../services/solanaService';
import VideoComponent from '../components/VideoComponent';
import RewardModal from '../components/RewardModal';
import { useWallet } from '@solana/wallet-adapter-react';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const StatusText = styled.p`
  margin: 10px 0;
  font-size: 1.2em;
  color: ${props => props.theme.colors.text};
`;

const SquatChallenge: React.FC = () => {
  const dispatch = useDispatch();
  const wallet = useWallet();
  const { todayCount, dailyGoal } = useSelector((state: RootState) => state.squats);
  const [showReward, setShowReward] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePoseDetected = async ({ isSquatting }: { isSquatting: boolean }) => {
    if (!isSquatting && !isProcessing) {
      setIsProcessing(true);
      try {
        const newCount = todayCount + 1;
        dispatch(updateSquatCount(1));

        // 10회마다 Solana 블록체인에 저장
        if (newCount % 10 === 0) {
          if (!wallet.connected || !wallet.publicKey) {
            console.error('지갑이 연결되지 않았습니다.');
            return;
          }

          const txSignature = await saveSquatDataOnChain(wallet, newCount);
          console.log(`✅ 블록체인 저장 완료: ${txSignature}`);
        }

        // 목표 달성 시 보상 화면 표시
        if (newCount >= dailyGoal) {
          setShowReward(true);
        }
      } catch (error) {
        console.error('운동 데이터 처리 중 오류:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <Container>
      <Title>🏋️‍♂️ 스쿼트 챌린지</Title>
      <StatusText>오늘의 스쿼트: {todayCount} / {dailyGoal}</StatusText>
      <VideoComponent onPoseDetected={handlePoseDetected} />
      {showReward && (
        <RewardModal 
          onClose={() => setShowReward(false)} 
          onSave={async () => {
            try {
              // 보상 저장 로직 구현
              console.log('보상 저장 완료!');
            } catch (error) {
              console.error('보상 저장 실패:', error);
            }
          }} 
        />
      )}
    </Container>
  );
};

export default SquatChallenge;
