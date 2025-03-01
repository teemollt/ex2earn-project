import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSquatCount } from '../store/squatSlice';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

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

const SquatChallenge: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { totalSquats } = useSelector((state: RootState) => state.squats);

  useEffect(() => {
    let detector: poseDetection.PoseDetector;
    let squatPosition = 'up';
    let videoStream: MediaStream;

    const setupCamera = async () => {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    };

    const detectPose = async () => {
      detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
      
      const detect = async () => {
        if (videoRef.current && canvasRef.current) {
          const poses = await detector.estimatePoses(videoRef.current);
          
          if (poses.length > 0) {
            const keypoints = poses[0].keypoints;
            const leftHip = keypoints.find((k: poseDetection.Keypoint) => k.name === 'left_hip');
            const leftKnee = keypoints.find((k: poseDetection.Keypoint) => k.name === 'left_knee');
            
            
            if (leftHip && leftKnee) {
              const angle = calculateAngle(leftHip, leftKnee);
              
              if (angle < 90 && squatPosition === 'up') {
                squatPosition = 'down';
              } else if (angle > 160 && squatPosition === 'down') {
                squatPosition = 'up';
                setCount(prev => prev + 1);
                dispatch(updateSquatCount(1));
              }
            }
          }
          
          requestAnimationFrame(detect);
        }
      };
      
      detect();
    };

    setupCamera().then(() => {
      videoRef.current?.play();
      detectPose();
    });

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [dispatch]);

  const calculateAngle = (joint1: poseDetection.Keypoint, joint2: poseDetection.Keypoint) => {
    const radians = Math.atan2(joint2.y - joint1.y, joint2.x - joint1.x);
    const angle = Math.abs(radians * 180.0 / Math.PI);
    return angle;
  };

  return (
    <Container>
      <h1>Squat Challenge</h1>
      <VideoContainer>
        <Video ref={videoRef} />
        <Canvas ref={canvasRef} />
      </VideoContainer>
      <Counter>{count}</Counter>
      <div>Total Squats: {totalSquats}</div>
    </Container>
  );
};

export default SquatChallenge;
