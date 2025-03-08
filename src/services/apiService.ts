import { AxiosRequestConfig } from 'axios';
import { authenticatedAxios } from './authService';

// ✅ 환경 변수에서 API 기본 URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface UserProfile {
  publicKey: string;
  totalSquats: number;
  level: number;
  rewards: number;
  // 필요한 다른 프로필 정보들 추가
}

// ✅ 공통 API 호출 함수
export const apiCall = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      ...(method !== 'GET' ? { data } : {}),
    };

    const response = await authenticatedAxios(config);
    return response.data;
  } catch (error: any) {
    // ✅ 상세 오류 메시지 로깅
    console.error(`❌ API 요청 오류 (${endpoint}):`, error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'API 요청 중 오류 발생');
  }
};

// ✅ 사용자 프로필 조회
export const getUserProfile = async (): Promise<UserProfile> => {
  return await apiCall('/user/profile', 'GET');
};

// ✅ 운동 기록 저장 (서버 API)
export const saveSquatSession = async (sessionData: any) => {
  return await apiCall('/squats/session', 'POST', sessionData);
};

// ✅ 운동 목표 저장
export const saveGoal = async (goal: number) => {
  return await apiCall('/goal/save', 'POST', { goal });
};

// ✅ 운동 기록 불러오기
export const getDashboardData = async () => {
  return await apiCall('/dashboard', 'GET');
};
