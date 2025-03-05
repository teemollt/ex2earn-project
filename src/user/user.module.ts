import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { UserRepository } from './user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { WalletAuthController } from './wallet-auth/wallet-auth.controller';
import { WalletAuthService } from './wallet-auth/wallet-auth.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [UserService, LeaderboardService, UserRepository, WalletAuthService],
  controllers: [UserController, LeaderboardController, WalletAuthController],
  exports: [WalletAuthService, JwtModule]
})
export class UserModule {}