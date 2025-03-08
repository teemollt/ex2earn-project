import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const Progress = styled.div<{ width: number }>`
  height: 20px;
  width: ${props => props.width}%;
  background-color: ${props => props.theme.colors.primary};
  transition: width 0.5s ease-in-out;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <Progress width={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
