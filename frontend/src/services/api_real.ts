import axios from 'axios';

// 기본 API URL 설정 (실제 백엔드 URL로 변경 필요)
const API_BASE_URL = 'https://api.example.com';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인증 토큰 설정 함수
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// API 요청 함수들
export const apiService = {
  // 로그인
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // 회원가입
  register: async (email: string, password: string, username: string) => {
    const response = await api.post('/auth/register', { email, password, username });
    return response.data;
  },

  // 사용자 프로필 조회
  getUserProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // 스쿼트 기록 저장
  saveSquatRecord: async (count: number) => {
    const response = await api.post('/squat/record', { count });
    return response.data;
  },

  // 스쿼트 기록 조회
  getSquatHistory: async () => {
    const response = await api.get('/squat/history');
    return response.data;
  },

  // 리워드 청구
  claimReward: async (amount: number) => {
    const response = await api.post('/reward/claim', { amount });
    return response.data;
  },
};

export default api;
