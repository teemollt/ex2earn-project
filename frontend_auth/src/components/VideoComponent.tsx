import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

const VideoContainer = styled.div`
  width: 640px;
  height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  background-color: #000;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
  z-index: 1;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  z-index: 2;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const drawPose = (pose: poseDetection.Pose) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw keypoints
    pose.keypoints.forEach((keypoint) => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
    });

    // Draw skeleton
    const connections = [
      ['left_hip', 'left_knee'],
      ['left_knee', 'left_ankle'],
      ['right_hip', 'right_knee'],
      ['right_knee', 'right_ankle'],
      ['left_shoulder', 'right_shoulder'],
      ['left_hip', 'right_hip'],
    ];

    connections.forEach(([start, end]) => {
      const startPoint = pose.keypoints.find((kp) => kp.name === start);
      const endPoint = pose.keypoints.find((kp) => kp.name === end);

      if (startPoint && endPoint && startPoint.score && endPoint.score &&
          startPoint.score > 0.3 && endPoint.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    let detector: poseDetection.PoseDetector;
    let animationFrameId: number;
    let isMounted = true;

    const initializeTensorFlow = async () => {
      if (!isMounted) return;
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js initialized with backend:', tf.getBackend());
      } catch (error) {
        if (isMounted) {
          console.error('TensorFlow.js 초기화 실패:', error);
          setError('TensorFlow 초기화 실패');
        }
      }
    };

    const setupCamera = async () => {
      if (!isMounted) return;
      try {
        const constraints = {
          video: {
            width: 640,
            height: 480,
            facingMode: 'user',
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current && isMounted) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play();
            }
          };
        }

        return new Promise<void>((resolve) => {
          if (videoRef.current) {
            videoRef.current.onplaying = () => {
              resolve();
            };
          }
        });
      } catch (error) {
        console.error('카메라 설정 실패:', error);
        setError('카메라를 사용할 수 없습니다. 카메라 권한을 확인해주세요.');
        throw error;
      }
    };

    const setupPoseDetection = async () => {
      if (!isMounted) return;
      try {
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            enableSmoothing: true,
          }
        );
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('포즈 감지 모델 로드 실패:', error);
          setError('AI 모델 로드 실패');
          setIsLoading(false);
        }
      }
    };

    const detectPose = async () => {
      if (!videoRef.current || !detector || !canvasRef.current || !isMounted) return;

      try {
        const video = videoRef.current;
        const poses = await detector.estimatePoses(video);
        
        if (poses.length > 0 && isMounted) {
          const pose = poses[0];
          drawPose(pose);
          const kneeAngle = calculateKneeAngle(pose.keypoints);
          handleSquatDetection(kneeAngle);
        }
        
        if (isMounted) {
          animationFrameId = requestAnimationFrame(detectPose);
        }
      } catch (error) {
        if (isMounted) {
          console.error('포즈 감지 실패:', error);
        }
      }
    };

    const initialize = async () => {
      if (!isMounted) return;
      try {
        setIsLoading(true);
        setError(null);
        
        await initializeTensorFlow();
        await setupCamera();
        await setupPoseDetection();
        
        if (isMounted) {
          detectPose();
        }
      } catch (error) {
        if (isMounted) {
          console.error('초기화 실패:', error);
          setError('카메라 또는 AI 모델 초기화에 실패했습니다.');
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
      if (detector) {
        detector.dispose();
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
      {isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
          ⏳ 카메라 및 AI 모델을 불러오는 중...
        </div>
      ) : error ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          ❌ 오류 발생: {error}
          <br />
          <small>페이지를 새로고침하거나 카메라 권한을 확인해주세요.</small>
        </div>
      ) : (
        <>
          <Video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
          />
          <Canvas 
            ref={canvasRef} 
            width={640} 
            height={480} 
          />
          <SquatCounter>
            스쿼트 횟수: {squatCount}
            {isSquatting && ' (스쿼트 중...)'}
          </SquatCounter>
        </>
      )}
    </VideoContainer>
  );
};

export default VideoComponent;
