import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Camera } from '@mediapipe/camera_utils';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const CameraContainer = styled.div`
  width: 640px;
  height: 480px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
`;

const CounterDisplay = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const StartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CanvasOverlay = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const StatusDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CameraContainerWrapper = styled.div<{ $isSquatting: boolean }>`
  border: 5px solid ${props => props.$isSquatting ? '#4CAF50' : '#ddd'};
  transition: border-color 0.3s ease;
`;

// Helper functions
const calculateAngle = (a: { x: number, y: number }, b: { x: number, y: number }, c: { x: number, y: number }) => {
  let radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

const checkSquatState = (angle: number) => {
  if (angle > 160) return 'standing';
  if (angle < 110) return 'squatting';
  return 'transition';
}

const SquatChallenge: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [squatState, setSquatState] = useState('standing');
  const [isSquatting, setIsSquatting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResults);

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await pose.send({image: videoRef.current});
          }
        },
        width: 640,
        height: 480
      });

      if (isStarted) {
        camera.start();
      } else {
        camera.stop();
      }
    }

    return () => {
      pose.close();
    };
  }, [isStarted]);

  const onResults = (results: any) => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');
      if (canvasCtx) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
        drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
        canvasCtx.restore();
      }
    }

    if (results.poseLandmarks) {
      const hip = results.poseLandmarks[23];
      const knee = results.poseLandmarks[25];
      const ankle = results.poseLandmarks[27];

      const angle = calculateAngle(
        { x: hip.x, y: hip.y },
        { x: knee.x, y: knee.y },
        { x: ankle.x, y: ankle.y }
      );

      const currentSquatState = checkSquatState(angle);
      setSquatState(currentSquatState);

      if (currentSquatState === 'squatting' && !isSquatting) {
        setIsSquatting(true);
      } else if (currentSquatState === 'standing' && isSquatting) {
        setIsSquatting(false);
        setCount(prevCount => prevCount + 1);
      }
    }
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleStop = () => {
    setIsStarted(false);
    setCount(0);
  };

  return (
    <PageContainer>
      <Title>Squat Challenge</Title>
      <StatusDisplay>Status: {squatState.charAt(0).toUpperCase() + squatState.slice(1)}</StatusDisplay>
      <CameraContainerWrapper $isSquatting={isSquatting}>
        <CameraContainer>
          <Video ref={videoRef} />
          <CanvasOverlay ref={canvasRef} width="640" height="480" />
        </CameraContainer>
      </CameraContainerWrapper>
      <CounterDisplay>{count}</CounterDisplay>
      {isStarted ? (
        <StartButton onClick={handleStop}>Stop Challenge</StartButton>
      ) : (
        <StartButton onClick={handleStart}>Start Challenge</StartButton>
      )}
    </PageContainer>
  );
};

export default SquatChallenge;
