import React, { useRef, useEffect } from 'react';
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

interface VideoComponentProps {
  onPoseDetected: (pose: any) => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ onPoseDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      if (videoRef.current && canvasRef.current && detector) {
        const poses = await detector.estimatePoses(videoRef.current);
        if (poses.length > 0) {
          const pose = poses[0];
          // Implement squat detection logic here
          const isSquatting = checkSquatPosition(pose);
          onPoseDetected({ isSquatting });
        }
        requestAnimationFrame(detectPose);
      }
    };

    setupCamera();
    setupPoseDetection().then(detectPose);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onPoseDetected]);

  const checkSquatPosition = (pose: poseDetection.Pose): boolean => {
    // Implement squat detection logic based on knee angle
    // This is a simplified example and may need adjustment
    const leftHip = pose.keypoints.find(kp => kp.name === 'left_hip');
    const leftKnee = pose.keypoints.find(kp => kp.name === 'left_knee');
    const leftAnkle = pose.keypoints.find(kp => kp.name === 'left_ankle');

    if (leftHip && leftKnee && leftAnkle) {
      const angle = calculateAngle(leftHip, leftKnee, leftAnkle);
      return angle < 100; // Squat detected if knee angle is less than 100 degrees
    }
    return false;
  };

  const calculateAngle = (a: poseDetection.Keypoint, b: poseDetection.Keypoint, c: poseDetection.Keypoint) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return angle;
  };

  return (
    <VideoContainer>
      <Video ref={videoRef} autoPlay playsInline />
      <Canvas ref={canvasRef} width={640} height={480} />
    </VideoContainer>
  );
};

export default VideoComponent;
