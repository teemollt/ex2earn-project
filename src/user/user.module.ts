import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { LeaderboardService } from './leaderboard/leaderboard.service';

@Module({
  providers: [UserService, LeaderboardService],
  controllers: [UserController, LeaderboardController]
})
export class UserModule {}
