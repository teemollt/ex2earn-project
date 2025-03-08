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
  imports: [ConfigModule.forRoot(), UserModule, CoreModule],
  providers: [ConfigService, PrismaService, SolanaService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    console.log(
      '🔹 DATABASE_URL:',
      this.configService.get<string>('DATABASE_URL'),
    );
    console.log('🔹 JWT_SECRET:', this.configService.get<string>('JWT_SECRET'));
    console.log('🔹 PORT:', this.configService.get<number>('PORT'));
  }

  configure(consumer: MiddlewareConsumer) {
    const corsOptions: CorsOptions = {
      origin: ['http://localhost:3001', 'http://localhost:5173'],
      credentials: true,
    };

    consumer
      .apply(
        helmet(), // Helmet은 기본적으로 함수로 사용 가능
        cors(corsOptions), // CorsOptions 타입을 명시적으로 전달
      )
      .forRoutes('*');
  }
}
