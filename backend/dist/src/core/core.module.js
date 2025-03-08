import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise/exercise.controller';
import { RewardController } from './reward/reward.controller';
import { RewardService } from './reward/reward.service';
import { ExerciseService } from './exercise/exercise.service';
import { PrismaModule } from '../../prisma/prisma.module'; // ✅ PrismaModule import 추가

@Module({
  imports: [PrismaModule], // ✅ PrismaModule 추가
  controllers: [ExerciseController, RewardController],
  providers: [ExerciseService, RewardService],
  exports: [ExerciseService, RewardService],
})
export class CoreModule {}
