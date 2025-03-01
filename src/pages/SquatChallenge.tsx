import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CONFIG } from '../config';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: ${() => CONFIG.COLORS.BACKGROUND};
`;

const Title = styled.h1`
  color: ${() => CONFIG.COLORS.TEXT};
  margin-bottom: 20px;
`;

const CameraContainer = styled.div`
  width: ${() => CONFIG.CAMERA.WIDTH}px;
  height: ${() => CONFIG.CAMERA.HEIGHT}px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CounterDisplay = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: ${() => CONFIG.COLORS.PRIMARY};
  margin-bottom: 20px;
`;

const StartButton = styled.button`
  background-color: ${() => CONFIG.COLORS.PRIMARY};
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${() => CONFIG.COLORS.SECONDARY};
  }
`;

const SquatChallenge: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [count, setCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isStarted) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isStarted]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
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
      <CameraContainer>
        <Video ref={videoRef} autoPlay playsInline />
      </CameraContainer>
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
