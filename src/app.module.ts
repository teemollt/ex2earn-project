import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'; 
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './common/prisma.service';
import { SolanaService } from './common/solana.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, 
    UserModule, 
    CoreModule,

  ],
  providers: [PrismaService, SolanaService],
})
export class AppModule implements NestModule {
  private readonly isDev: string = process.env.MODE === 'dev' ? true : false

  configure(consumer: MiddlewareConsumer) {
    throw new Error('Method not implemented.');
  }
}