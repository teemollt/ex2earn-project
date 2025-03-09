/*import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSquatCount, completeChallenge } from '../store/squatSlice';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import { saveSquatSession, claimReward } from '../services/apiService';
import { useWallet } from '@solana/wallet-adapter-react';
import { saveSquatData } from '../services/solanaService';

const { publicKey } = useWallet();

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Counter = styled.div`
  font-size: 72px;
  text-align: center;
  margin: 20px 0;
`;

const Instructions = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const CelebrationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondaryHover};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const SquatChallenge: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(0);
  const [lastSquatTime, setLastSquatTime] = useState(0);
  const [isFullBody, setIsFullBody] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionSquats, setSessionSquats] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [squatTimes, setSquatTimes] = useState<number[]>([]);
  const [sessionActive, setSessionActive] = useState(false);
  const MAX_SESSION_SQUATS = 15;
  
  const dispatch = useDispatch();
  const { totalSquats } = useSelector((state: RootState) => state.squats);
  const dailyGoal = useSelector((state: RootState) => state.squats.dailyGoal);
  const todayCount = useSelector((state: RootState) => state.squats.todayCount);
  const lastCompletionDate = useSelector((state: RootState) => state.squats.lastCompletionDate);
  
  // 오늘 날짜 확인
  const today = new Date().toISOString().split('T')[0];
  const isNewDay = lastCompletionDate !== today;
  
  // 세션 시작 함수
  const startSession = () => {
  setSessionActive(true);
  setSessionSquats(0);
  setSessionStartTime(Date.now());
  setSquatTimes([]);
  };
  const saveSquatDataOnChain = async () => {
    if (!publicKey) {
      console.error('지갑이 연결되지 않았습니다.');
      return;
    }
  
    try {
      await saveSquatData(publicKey, sessionSquats);
      console.log('스쿼트 데이터가 온체인에 저장되었습니다.');
    } catch (error) {
      console.error('온체인 데이터 저장 실패:', error);
    }
  };

  
  // 세션 종료 함수
  const endSession = async () => {
    setSessionActive(false);
    if (sessionStartTime && squatTimes.length > 0) {
      const sessionDuration = Date.now() - sessionStartTime;
      const averageTimeBetweenSquats = sessionDuration / squatTimes.length;
  
      if (averageTimeBetweenSquats < 1500) {
        console.warn('Suspicious squat pattern detected');
        alert('스쿼트 패턴이 비정상적입니다. 다시 시도해주세요.');
        return;
      }
  
      try {
        await saveSquatSession({
          count: sessionSquats,
          startTime: sessionStartTime,
          endTime: Date.now(),
          squatTimes: squatTimes,
        });
  
        await saveSquatDataOnChain(); // 온체인 데이터 저장
        console.log('Session data saved successfully');
      } catch (error) {
        console.error('Failed to save session data:', error);
        alert('세션 데이터를 저장하지 못했습니다.');
      }
    }
  };
  
  
// 세션 데이터 검증 및 저장
if (sessionStartTime && squatTimes.length > 0) {
  const sessionDuration = Date.now() - sessionStartTime;
  const averageTimeBetweenSquats = sessionDuration / squatTimes.length;
  
  // 비정상적으로 빠른 패턴 감지
  if (averageTimeBetweenSquats < 1500) { // 평균 1.5초 미만은 의심스러움
    console.warn('Suspicious squat pattern detected');
    return; // 의심스러운 패턴은 기록하지 않음
  }
  
  try {
    // 세션 데이터를 백엔드에 저장
    await saveSquatSession({
      count: sessionSquats,
      startTime: sessionStartTime,
      endTime: Date.now(),
      squatTimes: squatTimes
    });
    
    console.log('Session data saved successfully');
  } catch (error) {
    console.error('Failed to save session data:', error);
  }
}


};

// 스쿼트 카운트 업데이트 시 목표 달성 확인
useEffect(() => {
  // 오늘 목표를 달성했고, 아직 축하 메시지가 표시되지 않았다면
  if (todayCount >= dailyGoal && !showCelebration) {
    setShowCelebration(true);

    // 오늘 챌린지 완료 표시
    dispatch(completeChallenge(today));
  }
}, [todayCount, dailyGoal, showCelebration, dispatch, today]);

const handleClaimReward = async () => {
try {
// 백엔드 API를 통해 보상 청구
const result = await claimReward();
console.log('Reward claimed:', result);
alert(`축하합니다! ${result.amount} 토큰을 받았습니다.`);
setShowCelebration(false);
} catch (error) {
console.error('Failed to claim reward:', error);
alert('보상 청구에 실패했습니다. 다시 시도해주세요.');
}
};

useEffect(() => {
let detector: poseDetection.PoseDetector | null = null;
let squatPosition = 'up';
let videoStream: MediaStream | null = null;
let animationFrameId: number | null = null;

// TensorFlow 백엔드 초기화
const setupTF = async () => {
  await tf.ready();
  await tf.setBackend('webgl');
  console.log('TensorFlow backend initialized:', tf.getBackend());
};

const setupCamera = async () => {
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 640 },
        height: { ideal: 480 }
      } 
    });
    
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream;
      return new Promise<void>((resolve) => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            const playPromise = videoRef.current?.play();
            if (playPromise !== undefined) {
              playPromise.then(resolve).catch(error => {
                console.error("비디오 재생 오류:", error);
                resolve();
              });
            } else {
              resolve();
            }
          };
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    console.error("카메라 접근 오류:", error);
  }
};

const detectPose = async () => {
  try {
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
    );
    console.log('Pose detector created');
    
    const detect = async () => {
      if (!videoRef.current || !canvasRef.current || !detector) {
        animationFrameId = requestAnimationFrame(detect);
        return;
      }

      try {
        const poses = await detector.estimatePoses(videoRef.current);
        
        // 캔버스에 포즈 그리기
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
          animationFrameId = requestAnimationFrame(detect);
          return;
        }
        
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        if (poses.length > 0) {
          const keypoints = poses[0].keypoints;
          
          // 키포인트 그리기
          keypoints.forEach((keypoint: poseDetection.Keypoint) => {
            if (keypoint.score && keypoint.score > 0.3) {
              ctx.beginPath();
              ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
              ctx.fillStyle = 'red';
              ctx.fill();
              
              // 키포인트 이름 표시
              ctx.fillStyle = 'white';
              ctx.font = '10px Arial';
              ctx.fillText(keypoint.name || '', keypoint.x + 10, keypoint.y);
            }
          });
          
          // 전신이 감지되었는지 확인 (임계값 완화: 0.3 -> 0.2)
          const leftHip = keypoints.find((k: poseDetection.Keypoint) => k.name === 'left_hip');
          const leftKnee = keypoints.find((k: poseDetection.Keypoint) => k.name === 'left_knee');
          const leftAnkle = keypoints.find((k: poseDetection.Keypoint) => k.name === 'left_ankle');
          const rightHip = keypoints.find((k: poseDetection.Keypoint) => k.name === 'right_hip');
          const rightKnee = keypoints.find((k: poseDetection.Keypoint) => k.name === 'right_knee');
          const rightAnkle = keypoints.find((k: poseDetection.Keypoint) => k.name === 'right_ankle');
          
          const hasFullBody = 
            (leftHip?.score ?? 0) > 0.2 && (leftKnee?.score ?? 0) > 0.2 && (leftAnkle?.score ?? 0) > 0.2 ||
            (rightHip?.score ?? 0) > 0.2 && (rightKnee?.score ?? 0) > 0.2 && (rightAnkle?.score ?? 0) > 0.2;
          
          setIsFullBody(hasFullBody);
          
          // 디버깅 정보 표시
          ctx.font = '16px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText(`Full body detected: ${hasFullBody ? 'Yes' : 'No'}`, 10, 30);
          
          if (hasFullBody) {
            // 왼쪽 또는 오른쪽 다리 중 더 잘 보이는 쪽 사용
            let hip, knee, ankle;
            
            if ((leftHip?.score ?? 0) > (rightHip?.score ?? 0)) {
              hip = leftHip;
              knee = leftKnee;
              ankle = leftAnkle;
              ctx.fillText('Using left leg', 10, 50);
            } else {
              hip = rightHip;
              knee = rightKnee;
              ankle = rightAnkle;
              ctx.fillText('Using right leg', 10, 50);
            }
            
            if (hip && knee && ankle) {
              // 각도 계산 (무릎 각도)
              const angle = calculateKneeAngle(hip, knee, ankle);
              
              // 디버깅용 각도 표시
              ctx.fillText(`Knee angle: ${angle.toFixed(2)}°`, 10, 70);
              ctx.fillText(`Position: ${squatPosition}`, 10, 90);
              
              // 스쿼트 감지 (디바운싱 적용, 임계값 완화: 120/150 -> 110/140)
              const currentTime = Date.now();
              const timeSinceLastSquat = currentTime - lastSquatTime;
              
              if (angle < 110 && squatPosition === 'up' && timeSinceLastSquat > 800) {
                squatPosition = 'down';
                console.log('Squat down detected, angle:', angle);
                ctx.fillText(`DOWN detected: ${angle.toFixed(2)}°`, 10, 110);
              } else if (angle > 140 && squatPosition === 'down' && timeSinceLastSquat > 800) {
                squatPosition = 'up';
                setCount(prev => prev + 1);
                dispatch(updateSquatCount(1));
                setLastSquatTime(currentTime);
                console.log('Squat up detected, angle:', angle);
                ctx.fillText(`UP detected & counted!`, 10, 130);
                
                // 세션 관련 로직은 유지하되, 카운트에는 영향을 주지 않도록 수정
                if (sessionActive) {
                  setSessionSquats(prev => prev + 1);
                  setSquatTimes(prev => [...prev, currentTime]);
                  
                  if (sessionSquats + 1 >= MAX_SESSION_SQUATS) {
                    endSession();
                  }
                }
              }
            }
          }
        }
        
        animationFrameId = requestAnimationFrame(detect);
      } catch (error) {
        console.error('Pose estimation error:', error);
        animationFrameId = requestAnimationFrame(detect);
      }
    };
    
    detect();
  } catch (error) {
    console.error('Detector creation error:', error);
  }
};

const init = async () => {
  await setupTF();
  await setupCamera();
  await detectPose();
};

init();

return () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
  }
};

  }, [dispatch]);

 // 세 점 사이의 각도 계산 (무릎 각도)
const calculateKneeAngle = (hip: poseDetection.Keypoint, knee: poseDetection.Keypoint, ankle: poseDetection.Keypoint) => {
  const radians = Math.atan2(ankle.y - knee.y, ankle.x - knee.x) -
  Math.atan2(hip.y - knee.y, hip.x - knee.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180) {
  angle = 360 - angle;
  }
  return angle;
  };
  
  // 캔버스 크기 설정
  useEffect(() => {
  const resizeCanvas = () => {
  if (canvasRef.current && videoRef.current) {
  canvasRef.current.width = videoRef.current.clientWidth;
  canvasRef.current.height = videoRef.current.clientHeight;
  }
  };
    
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  return () => {
    window.removeEventListener('resize', resizeCanvas);
  };
  
  }, []);
  
  

const progressPercentage = Math.min((todayCount / dailyGoal) * 100, 100);

return (
<Container>
<h1>Squat Challenge</h1>
{!isFullBody && (
<Instructions>
전신이 카메라에 보이도록 뒤로 물러서세요. 측면으로 서면 스쿼트 감지가 더 정확합니다.
</Instructions>
)}
<div>
오늘의 목표: {todayCount} / {dailyGoal} 스쿼트
<ProgressBar>
<Progress width={progressPercentage} />
</ProgressBar>
</div>
<div style={{ marginBottom: '20px', padding: '10px', backgroundColor: sessionActive ? '#e6ffe6' : '#ffe6e6', borderRadius: '5px' }}>
{!sessionActive ? (
<>
<p>세션이 비활성화되어 있습니다. 세션을 시작하면 스쿼트 기록이 더 정확해집니다.</p>
<ModalButton onClick={startSession}>세션 시작</ModalButton>
</>
) : (
<>
<p>세션 활성화됨: {sessionSquats} / {MAX_SESSION_SQUATS} 스쿼트</p>
<ModalButton onClick={endSession}>세션 종료</ModalButton>
</>
)}
</div>
<VideoContainer>
<Video ref={videoRef} playsInline />
<Canvas ref={canvasRef} />
</VideoContainer>
<Counter>{count}</Counter>
<div>Total Squats: {totalSquats}</div>
{showCelebration && (
    <CelebrationModal>
      <ModalContent>
        <ModalTitle>축하합니다! 🎉</ModalTitle>
        <p>오늘의 스쿼트 챌린지 목표를 달성했습니다!</p>
        <p>보상으로 솔라나 토큰을 받으세요.</p>

<ModalButton onClick={handleClaimReward}>보상 받기</ModalButton>
</ModalContent>
</CelebrationModal>
)}
</Container>
);
};

//export default SquatChallenge;*/

export {}; // ✅ 빈 export 추가하여 모듈로 인식되도록 함.