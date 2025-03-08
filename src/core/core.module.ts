import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise/exercise.controller';
import { ExerciseService } from './exercise/exercise.service';
import { PrismaService } from '../../prisma/prisma.service'; // ✅ PrismaService 추가

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService], 
  exports: [ExerciseService], 
})
export class CoreModule {}
