import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * ✅ 운동 기록 저장 (Prisma 사용)
   */
  async saveExerciseRecord(walletAddress: string, count: number): Promise<any> {
    try {
      console.log('🚀 [DEBUG] 운동 기록 저장 요청:', { walletAddress, count });

      if (!walletAddress || count <= 0) {
        throw new HttpException('❌ 유효하지 않은 요청 데이터', HttpStatus.BAD_REQUEST);
      }

      // ✅ Prisma를 사용해 데이터 저장
      const newRecord = await this.prisma.exercise.create({
        data: {
          walletAddress,
          count,
          createdAt: new Date(), // ✅ 타임스탬프 추가
        },
      });

      console.log('✅ [DEBUG] 운동 기록 저장 성공:', newRecord);
      return newRecord;
    } catch (error) {
      console.error('❌ [ERROR] 운동 기록 저장 실패:', error);
      throw new HttpException(
        '운동 기록 저장 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * ✅ 사용자 운동 기록 조회 (Prisma 사용)
   */
  async getExerciseHistory(walletAddress: string): Promise<any> {
    try {
      console.log('🚀 [DEBUG] 운동 기록 조회 요청:', walletAddress);

      if (!walletAddress) {
        throw new HttpException('❌ 유효하지 않은 요청 데이터', HttpStatus.BAD_REQUEST);
      }

      // ✅ Prisma를 사용해 데이터 조회
      const history = await this.prisma.exercise.findMany({
        where: { walletAddress },
        orderBy: { createdAt: 'desc' },
      });

      if (!history.length) {
        console.warn('⚠️ [WARN] 운동 기록이 없습니다.');
        return { message: '운동 기록이 없습니다.', data: [] };
      }

      console.log('✅ [DEBUG] 운동 기록 조회 성공:', history);
      return history;
    } catch (error) {
      console.error('❌ [ERROR] 운동 기록 불러오기 실패:', error);
      throw new HttpException(
        '운동 기록 불러오기 중 오류 발생',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
