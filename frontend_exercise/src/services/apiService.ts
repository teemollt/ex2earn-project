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
    // Redux에서 최신 JWT 토큰 가져오기
    const state = store.getState();
    const token = state.auth.jwtToken;

    // 요청 설정
    const config: AxiosRequestConfig = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // 토큰이 있으면 추가
        'Content-Type': 'application/json',
      },
      withCredentials: true, // 쿠키 및 인증 정보 포함
      ...(method !== 'GET' ? { data } : {}), // GET 요청 시에는 data 제거
    };

    // API 요청 실행
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    // 상세 오류 메시지 로깅
    console.error(`❌ API 요청 오류 (${endpoint}):`, error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || 'API 요청 중 오류 발생');
  }
};

// Dashboard 데이터 조회 API 호출
export const getDashboardData = async () => {
  try {
    const response = await apiCall('/user/dashboard', 'GET');
    return response;
  } catch (error) {
    console.error('❌ Dashboard data retrieval failed:', error);
    throw error;
  }
};

// ✅ Solana 블록체인에 스쿼트 기록 저장 API 호출
export const saveSquatToSolana = async (walletAddress: string, count: number) => {
  try {
    const response = await apiCall('/solana/record_squat', 'POST', { walletAddress, count });
    console.log('✅ Solana 트랜잭션 성공:', response);
    return response;
  } catch (error) {
    console.error('❌ Solana 트랜잭션 실패:', error);
    throw new Error('❌ Solana 트랜잭션 실패');
  }
};

// ✅ 사용자 운동 기록 조회 API (GET 요청 수정)
export const getExerciseHistory = async (walletAddress: string) => {
  try {
    const response = await axios.get(`${API_URL}/solana/history`, {
      params: { wallet: walletAddress }, // ✅ GET 요청은 `params` 사용
    });
    return response.data;
  } catch (error) {
    console.error('❌ 운동 기록 불러오기 실패:', error);
    throw new Error('❌ 운동 기록 불러오기 실패');
  }
};
