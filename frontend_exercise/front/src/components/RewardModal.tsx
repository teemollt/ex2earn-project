import React from 'react';
import styled from 'styled-components';
import { useApiCall } from '../hooks/useApiCall';
import { saveProgress } from '../services/apiserver';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #4caf50;
  margin-bottom: 20px;
`;

const Message = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

const SaveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

interface RewardModalProps {
  onClose: () => void;
  onSave: () => Promise<void>; // onSave 속성 추가
}
  
  const RewardModal: React.FC<RewardModalProps> = ({ onClose }) => {
    const { callApi, loading, error } = useApiCall(saveProgress);
  
    const handleSave = async () => {
      try {
        await callApi();
        onClose();
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    };
  
    return (
      <ModalOverlay>
        <ModalContent>
          <Title>Congratulations! 🎉</Title>
          <Message>You've reached your daily squat goal!</Message>
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Progress'}
          </SaveButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
          {error && <ErrorMessage>Error: {error}</ErrorMessage>}
        </ModalContent>
      </ModalOverlay>
    );
  };
  
  const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
  `;
  
  export default RewardModal;