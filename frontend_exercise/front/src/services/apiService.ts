import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../store';

// ✅ 환경 변수에서 API 기본 URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// ✅ 공통 API 호출 함수
export const apiCall = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  try {
    // ✅ Redux에서 최신 JWT 토큰 가져오기
    const state = store.getState();
    const token = state.auth.jwtToken;

    // ✅ 요청 설정
    const config: AxiosRequestConfig = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // ✅ 토큰이 있으면 추가
        'Content-Type': 'application/json',
      },
      withCredentials: true, // ✅ 쿠키 및 인증 정보 포함
      ...(method !== 'GET' ? { data } : {}), // ✅ GET 요청 시에는 data 제거
    };

    // ✅ API 요청 실행
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    // ✅ 상세 오류 메시지 로깅
    console.error(`❌ API 요청 오류 (${endpoint}):`, error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'API 요청 중 오류 발생');
  }
};

// ✅ 지갑 인증 요청
export const authenticateWallet = async (authData: any) => {
  try {
    const response = await apiCall('/wallet-auth', 'POST', authData);
    console.log("🔹 서버 응답 데이터:", response); 
    return response;
  } catch (error) {
    console.error("❌ 지갑 인증 오류:", error);
    throw error;
  }
};


// ✅ 사용자 프로필 조회
export const getUserProfile = async () => {
  return await apiCall('/user/profile', 'GET');
};

// ✅ 운동 기록 저장 (서버 API)
export const saveSquatSession = async (sessionData: any) => {
  return await apiCall('/exercise', 'POST', sessionData);
};

// ✅ 운동 목표 저장
export const saveGoal = async (goal: number) => {
  return await apiCall('/user/goal', 'POST', { goal });
};

// ✅ 운동 기록 불러오기
export const getDashboardData = async () => {
  return await apiCall('/user/dashboard', 'GET');
};

// ✅ 리더보드 데이터 조회
export const getLeaderboard = async () => {
  return await apiCall('/leaderboard', 'GET');
};

// ✅ 보상 정보 조회
export const getRewards = async () => {
  return await apiCall('/reward', 'GET');
};
