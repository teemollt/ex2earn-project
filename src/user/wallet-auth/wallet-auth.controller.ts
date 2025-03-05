import { Controller, Get, Post, Body } from '@nestjs/common';
import { WalletAuthService } from './wallet-auth.service';
import { VerifySignatureDto } from '../dtos/verify-signature.dto';

@Controller('wallet-auth')
export class WalletAuthController {
  constructor(private readonly walletAuthService: WalletAuthService) {}

  // Nonce(무작위 메시지) 생성
  @Post('nonce')
  generateNonce(@Body() publicKey: string) {
    return this.walletAuthService.generateNonce(publicKey);
  }

  // 지갑 서명 검증
  @Post('verify')
  verifySignature(@Body() body: VerifySignatureDto) {
    return this.walletAuthService.verifySignature(body);
  }
}
