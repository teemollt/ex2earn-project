import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'; 
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { SolanaService } from './common/solana.service';
import helmet from 'helmet';
import cors from 'cors';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,
      envFilePath: ['.env'] }),
    UserModule, 
    CoreModule,
  ],
  providers: [PrismaService, SolanaService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false

  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(
          helmet(), 
          // morgan('dev'), 
          // cors({ origin: ['http://localhost:3000'], credentials: true })
        )
        .forRoutes('*'); // 모든 엔드포인트에 적용
  }
}