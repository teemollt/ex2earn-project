import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { SolanaService } from './common/solana.service';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CoreModule], // ✅ 환경 변수 로드
  providers: [ConfigService, PrismaService, SolanaService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  /**
   * ✅ 서버 시작 시 환경 변수 로깅
   */
  onModuleInit() {
    console.log('🔹 DATABASE_URL:', this.configService.get<string>('DATABASE_URL') || '값 없음');
    console.log('🔹 JWT_SECRET:', this.configService.get<string>('JWT_SECRET') || '값 없음');
    console.log('🔹 PORT:', this.configService.get<number>('PORT') || '3000');
  }

  /**
   * ✅ 미들웨어 설정 (보안 및 CORS)
   */
  configure(consumer: MiddlewareConsumer) {
    const allowedOrigins = this.configService.get<string>('CORS_ORIGINS')?.split(',') || [
      'http://localhost:3001',
      'http://localhost:5173',
    ];

    const corsOptions: CorsOptions = {
      origin: allowedOrigins,
      credentials: true,
    };

    consumer
      .apply(
        helmet({
          contentSecurityPolicy: false, // ✅ CSP 기본 설정 비활성화 (필요 시 조정)
          frameguard: { action: 'deny' }, // ✅ 클릭재킹 방지
          xssFilter: true, // ✅ XSS 공격 방어
        }),
        cors(corsOptions), // ✅ CORS 옵션 적용
      )
      .forRoutes('*');
  }
}
