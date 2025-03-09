import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSquatCount } from '../store/squatSlice';
import { saveSquatToSolana } from '../services/apiService';
import { useWallet } from '@solana/wallet-adapter-react';
import VideoComponent from '../components/VideoComponent';
import RewardModal from '../components/RewardModal';

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
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) => !props.disabled && props.theme.colors.primaryHover};
  }
`;

const SquatChallenge: React.FC = () => {
  const dispatch = useDispatch();
  const wallet = useWallet();
  const { todayCount, dailyGoal } = useSelector((state: RootState) => state.squats);
  const [showReward, setShowReward] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ 포즈 감지 핸들러
  const handlePoseDetected = async ({ isSquatting }: { isSquatting: boolean }) => {
    if (!isSquatting) {
      const newCount = todayCount + 1;
      dispatch(updateSquatCount(1)); // Redux 상태 업데이트

      // ✅ 10회마다 Solana 블록체인에 저장
      if (newCount % 10 === 0) {
        try {
          if (!wallet || !wallet.publicKey) {
            alert('❌ 지갑이 연결되지 않았습니다.');
            return;
          }

          setLoading(true);
          const txSignature = await saveSquatToSolana(wallet.publicKey.toString(), newCount);
          console.log(`✅ 블록체인 저장 완료: ${txSignature}`);
          alert('✅ 블록체인에 저장되었습니다!');
        } catch (error) {
          console.error('❌ 블록체인 저장 실패:', error);
        } finally {
          setLoading(false);
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
      <Button onClick={() => handlePoseDetected({ isSquatting: false })} disabled={loading}>
        {loading ? '저장 중...' : '블록체인에 저장'}
      </Button>
    </Container>
  );
};

export default SquatChallenge;
