import { Module } from '@nestjs/common';
import { WalletAuthController } from './wallet-auth/wallet-auth.controller';
import { WalletAuthService } from './wallet-auth/wallet-auth.service';

@Module({
  controllers: [WalletAuthController],
  providers: [WalletAuthService]
})
export class AuthModule {}
