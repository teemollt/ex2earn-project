import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const apiCall = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  const state = store.getState();
  const token = state.auth.jwtToken;

  const config: AxiosRequestConfig = {
    method,
    url: `${API_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in API call (${endpoint}):`, error);
    throw error;
  }
};

export const saveProgress = async (progressData: any) => {
  return await apiCall('/progress/save', 'POST', progressData);
};

export const getDashboardData = async () => {
  return await apiCall('/dashboard', 'GET');
};

export const saveGoal = async (goal: number) => {
  return await apiCall('/goal/save', 'POST', { goal });
};

export const authenticateWithWallet = async (walletAddress: string) => {
  return await apiCall('/auth/wallet', "POST", { walletAddress });
};