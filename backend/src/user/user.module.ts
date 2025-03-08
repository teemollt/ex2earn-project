import { Module } from '@nestjs/common';
import { WalletAuthController } from './wallet-auth/wallet-auth.controller'; // ✅ 정확한 경로 확인
import { WalletAuthService } from './wallet-auth/wallet-auth.service';
import { SolanaService } from '../common/solana.service'; // ✅ SolanaService 추가
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'your_jwt_secret' })], // ✅ JWT 설정 추가
  controllers: [WalletAuthController], // ✅ 컨트롤러 등록
  providers: [WalletAuthService, SolanaService], // ✅ SolanaService 추가
})
export class UserModule {}
