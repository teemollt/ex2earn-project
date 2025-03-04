import { apiCall } from './apiService';

// SquatStats 인터페이스 정의
export interface SquatStats {
  totalCount: number; // 전체 스쿼트 수
  todayCount: number; // 오늘의 스쿼트 수
}
// 스쿼트 챌린지 데이터 저장
export const saveSquatSession = async (sessionData: {
  count: number;
  startTime: number;
  endTime: number;
  squatTimes: number[];
}) => {
  return await apiCall('/squats/session', 'POST', sessionData);
};

// 사용자의 스쿼트 통계 가져오기
export const getUserSquatStats = async (): Promise<SquatStats> => {
  return await apiCall<SquatStats>('/squats/stats', 'GET');
};

// 보상 청구하기
export const claimReward = async () => {
  return await apiCall('/rewards/claim', 'POST');
};

// 진행 상황 저장하기
export const saveProgress = async () => {
  // 진행 상황을 저장하는 로직을 구현합니다.
  return await apiCall('/progress/save', 'POST');
};

export const saveGoal = async (goal: number) => {
  return await apiCall('/goal/save', "POST", { goal });
};

export const getDashboardData = async (): Promise<Partial<SquatStats>> => {
  return await apiCall('/dashboard', 'GET');
};

