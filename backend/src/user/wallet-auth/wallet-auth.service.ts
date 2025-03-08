import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';// ✅ Solana 서명 검증 로직 추가
import bs58 from 'bs58'; // ✅ Base58 디코딩을 위해 추가
import { SolanaService } from '../../common/solana.service';

@Injectable()
export class WalletAuthService {
  constructor(
    private jwtService: JwtService,
    private solanaService: SolanaService,
  ) {}

  /**
   * ✅ Phantom Deep Link 기반 인증
   */
  async authenticate(
    publicKey: string,
    message: string,
    signature: string,
  ): Promise<{ token: string }> {
    console.log('🔹 받은 데이터:', { publicKey, message, signature });

    // ✅ Base58 디코딩 후 검증
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

    // ✅ JWT 토큰 생성 후 반환
    const payload = { publicKey };
    const accessToken = this.jwtService.sign(payload);

    return { token: accessToken };
  }
}
