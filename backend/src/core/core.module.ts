import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise/exercise.controller';
import { RewardController } from './reward/reward.controller';
import { RewardService } from './reward/reward.service';
import { ExerciseService } from './exercise/exercise.service';

@Module({

  controllers: [ExerciseController, RewardController],

  providers: [RewardService, ExerciseService]
})
export class CoreModule {}
