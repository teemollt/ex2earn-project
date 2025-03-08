import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService], // ✅ 다른 모듈에서도 사용 가능하게 설정
})
export class ExerciseModule {}
