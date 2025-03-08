import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SolanaService } from '../../common/solana.service'; // ✅ Solana 검증 서비스 추가
import bs58 from 'bs58';

@Controller('wallet-auth')
export class WalletAuthController { // ✅ ✅ ✅ export 확인
  constructor(private jwtService: JwtService, private solanaService: SolanaService) {}

  @Post()
  async authenticate(
    @Body() body: { publicKey: string; message: string; signature: string },
  ) {
    const { publicKey, message, signature } = body;
    console.log('🔹 받은 데이터:', { publicKey, message, signature });

    const decodedSignature = bs58.decode(signature);
    const isValidSignature = this.solanaService.verifySignature(
      publicKey,
      message,
      decodedSignature,
    );

    if (!isValidSignature) {
      console.error('❌ 서명 검증 실패! 401 Unauthorized 반환');
      throw new UnauthorizedException('Invalid wallet signature.');
    }

    console.log('✅ 서명 검증 성공! JWT 토큰 생성 중...');
    const payload = { publicKey };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: '✅ Authentication successful',
      token: accessToken,
    };
  }
}
