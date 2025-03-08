import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as poseDetection from '@tensorflow-models/pose-detection';

const VideoContainer = styled.div`
  width: 640px;
  height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
`;

const SquatCounter = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const SQUAT_DOWN_ANGLE = 110; // ✅ 스쿼트 감지 기준 (앉은 자세)
const SQUAT_UP_ANGLE = 160; // ✅ 스쿼트 감지 기준 (서 있는 자세)
const SQUAT_DELAY = 800; // ✅ 최소 스쿼트 간격 (ms) - 너무 빠른 반복 감지 방지

interface VideoComponentProps {
  onPoseDetected: (pose: { isSquatting: boolean }) => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ onPoseDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSquatting, setIsSquatting] = useState(false);
  const [squatCount, setSquatCount] = useState(0);
  const [lastSquatTime, setLastSquatTime] = useState<number>(0);

  useEffect(() => {
    let detector: poseDetection.PoseDetector;

    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    };

    const setupPoseDetection = async () => {
      detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
    };

    const detectPose = async () => {
      if (!videoRef.current || !detector) return;

      const poses = await detector.estimatePoses(videoRef.current);
      if (poses.length > 0) {
        const keypoints = poses[0].keypoints;
        const kneeAngle = calculateKneeAngle(keypoints);
        handleSquatDetection(kneeAngle);
      }
      requestAnimationFrame(detectPose);
    };

    setupCamera();
    setupPoseDetection().then(detectPose);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const calculateKneeAngle = (keypoints: poseDetection.Keypoint[]) => {
    const hip = keypoints.find((kp: poseDetection.Keypoint) => kp.name === 'left_hip');
    const knee = keypoints.find((kp: poseDetection.Keypoint) => kp.name === 'left_knee');
    const ankle = keypoints.find((kp: poseDetection.Keypoint) => kp.name === 'left_ankle');
  
    if (!hip || !knee || !ankle) return 180;
  
    return calculateAngle(hip, knee, ankle);
  };
  

  const calculateAngle = (p1: any, p2: any, p3: any) => {
    const radian = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radian * 180) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  const handleSquatDetection = (kneeAngle: number) => {
    const now = Date.now();
    if (kneeAngle <= SQUAT_DOWN_ANGLE && !isSquatting) {
      setIsSquatting(true);
    } else if (kneeAngle >= SQUAT_UP_ANGLE && isSquatting) {
      if (now - lastSquatTime >= SQUAT_DELAY) {
        setSquatCount(prev => prev + 1);
        setLastSquatTime(now);
        onPoseDetected({ isSquatting: false });
      }
      setIsSquatting(false);
    }
  };

  return (
    <VideoContainer>
      <Video ref={videoRef} autoPlay playsInline />
      <Canvas ref={canvasRef} width={640} height={480} />
      <SquatCounter>스쿼트 횟수: {squatCount}</SquatCounter>
    </VideoContainer>
  );
};

export default VideoComponent;
