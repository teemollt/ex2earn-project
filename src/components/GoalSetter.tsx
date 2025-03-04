import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyGoal } from '../store/squatSlice';
import { RootState } from '../store';
import styled from 'styled-components';
import { useApiCall } from '../hooks/useApiCall';
import { saveGoal } from '../services/apiserver';

const GoalSetterContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

const GoalSetter: React.FC = () => {
  const dispatch = useDispatch();
  const currentGoal = useSelector((state: RootState) => state.squats.dailyGoal);
  const [goalInput, setGoalInput] = useState(currentGoal.toString());
  const { callApi, loading, error } = useApiCall(saveGoal);

  const handleSetGoal = async () => {
    const newGoal = parseInt(goalInput, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      try {
        await callApi(newGoal);
        dispatch(setDailyGoal(newGoal));
      } catch (err) {
        console.error('Failed to set goal:', err);
      }
    }
  };

  return (
    <GoalSetterContainer>
      <Input
        type="number"
        value={goalInput}
        onChange={(e) => setGoalInput(e.target.value)}
        placeholder="Set daily goal"
        disabled={loading}
      />
      <Button onClick={handleSetGoal} disabled={loading}>
        {loading ? 'Setting...' : 'Set Goal'}
      </Button>
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
    </GoalSetterContainer>
  );
};

export default GoalSetter;
