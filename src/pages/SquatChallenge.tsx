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

const SquatChallenge: React.FC = () => {
  const dispatch = useDispatch();
  const wallet = useWallet(); // ✅ useWallet()을 컴포넌트 내부에서 호출 (오류 해결)
  const { todayCount, dailyGoal } = useSelector((state: RootState) => state.squats);
  const [showReward, setShowReward] = useState(false);

  const handlePoseDetected = async ({ isSquatting }: { isSquatting: boolean }) => {
    if (!isSquatting) {
      const newCount = todayCount + 1;
      dispatch(updateSquatCount(1)); // ✅ Redux 상태 업데이트

      // ✅ 10회마다 Solana 블록체인에 저장
      if (newCount % 10 === 0) {
        try {
          if (!wallet || !wallet.publicKey) {
            alert('❌ 지갑이 연결되지 않았습니다. 블록체인 저장이 불가능합니다.');
            return;
          }

          const txSignature = await saveSquatDataOnChain(wallet.publicKey.toString(), newCount);
          console.log(`✅ 블록체인 저장 완료: ${txSignature}`);
        } catch (error) {
          console.error('❌ 블록체인 저장 실패:', error);
        }
      }

      // ✅ 목표 달성 시 보상 화면 표시
      if (newCount >= dailyGoal) {
        setShowReward(true);
      }
    }
  };

  return (
    <Container>
      <Title>🏋️‍♂️ 스쿼트 챌린지</Title>
      <VideoComponent onPoseDetected={handlePoseDetected} />
      {showReward && <RewardModal onClose={() => setShowReward(false)} onSave={async () => console.log('보상 저장!')} />}
    </Container>
  );
};

export default SquatChallenge;
