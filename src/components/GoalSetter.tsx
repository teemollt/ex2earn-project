import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyGoal } from '../store/squatSlice';
import { RootState } from '../store';
import styled from 'styled-components';

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
`;

const GoalSetter: React.FC = () => {
  const dispatch = useDispatch();
  const currentGoal = useSelector((state: RootState) => state.squats.dailyGoal);
  const [goalInput, setGoalInput] = useState(currentGoal.toString());

  const handleSetGoal = () => {
    const newGoal = parseInt(goalInput, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      dispatch(setDailyGoal(newGoal));
    }
  };

  return (
    <GoalSetterContainer>
      <Input
        type="number"
        value={goalInput}
        onChange={(e) => setGoalInput(e.target.value)}
        placeholder="Set daily goal"
      />
      <Button onClick={handleSetGoal}>Set Goal</Button>
    </GoalSetterContainer>
  );
};

export default GoalSetter;
