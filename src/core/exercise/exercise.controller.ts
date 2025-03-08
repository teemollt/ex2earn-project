import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')  // ✅ 여기 확인 (혹시 'core/exercise'라면 수정 필요)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('save')
  async saveExercise(@Body() body: { walletAddress: string; count: number }) {
    return this.exerciseService.saveExerciseRecord(body.walletAddress, body.count);
  }

  @Get('history')
  async getHistory(@Query('wallet') walletAddress: string) {
    return this.exerciseService.getExerciseHistory(walletAddress);
  }
}
