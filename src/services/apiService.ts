import axios from 'axios';
import { getAuthHeader } from './authService';
import { store } from '../store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// 스쿼트 챌린지 데이터 저장
export const saveSquatSession = async (sessionData: {
  count: number;
  startTime: number;
  endTime: number;
  squatTimes: number[];
}) => {
  const state = store.getState();
  const token = state.auth.jwtToken;
  
  try {
    const response = await axios.post(
      `${API_URL}/squats/session`, 
      sessionData,
      getAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error saving squat session:', error);
    throw error;
  }
};

// 사용자의 스쿼트 통계 가져오기
export const getUserSquatStats = async () => {
  const state = store.getState();
  const token = state.auth.jwtToken;
  
  try {
    const response = await axios.get(
      `${API_URL}/squats/stats`,
      getAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching squat stats:', error);
    throw error;
  }
};

// 보상 청구하기
export const claimReward = async () => {
  const state = store.getState();
  const token = state.auth.jwtToken;
  
  try {
    const response = await axios.post(
      `${API_URL}/rewards/claim`,
      {},
      getAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error claiming reward:', error);
    throw error;
  }
};
