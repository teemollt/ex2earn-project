import { Controller, Get, Post, Body } from '@nestjs/common';
import { WalletAuthService } from './wallet-auth.service';
import { VerifySignatureDto } from '../dtos/verify-signature.dto';
import { RequestNonceDto } from '../dtos/request-nonce.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet Auth')
@Controller('wallet-auth')
export class WalletAuthController {
  constructor(private readonly walletAuthService: WalletAuthService) {}

  // Nonce(무작위 메시지) 생성
  @Post('nonce')
  @ApiOperation({ summary: 'Get nonce for wallet signature' })
  @ApiResponse({ 
    status: 200, 
    description: 'Nonce generated successfully',
    schema: {
      example: {
        nonce: 'random-string-here'
      }
    }
  })
  generateNonce(@Body() body: RequestNonceDto) {
    return this.walletAuthService.generateNonce(body);
  }

  // 지갑 서명 검증
  @Post('verify')
  @ApiOperation({ summary: 'Verify wallet signature' })
  @ApiResponse({ 
    status: 200, 
    description: 'Signature verified successfully',
    schema: {
      example: {
        success: true,
        token: 'jwt-token-here'
      }
    }
  })
  verifySignature(@Body() body: VerifySignatureDto) {
    return this.walletAuthService.verifySignature(body);
  }
}
