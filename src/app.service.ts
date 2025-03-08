import axios from "axios";
import { Injectable } from '@nestjs/common';

const API_BASE_URL = "http://localhost:3000/core/exercise"; // ✅ 경로 수정

// ✅ 운동 기록 저장 API 호출
export const saveExerciseRecord = async (userId: string, count: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, { userId, count });
    return response.data;
  } catch (error) {
    console.error("❌ 운동 기록 저장 실패:", error);
    throw error;
  }
};

// ✅ 사용자 운동 기록 조회 API 호출
export const getExerciseHistory = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error("❌ 운동 기록 불러오기 실패:", error);
    throw error;
  }
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, Solana!';
  }
}
