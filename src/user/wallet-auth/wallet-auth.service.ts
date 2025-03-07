import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { generateRandomNickname } from '../../utils/nickname-generator';
import { VerifySignatureDto } from '../dtos/verify-signature.dto';
import { RequestNonceDto } from '../dtos/request-nonce.dto';

@Injectable()
export class WalletAuthService {
  constructor(
    private readonly userRepository: UserRepository, 
    private readonly jwtService: JwtService) {}

  // 서명 검증시 사용할 Nonce 저장소
  private nonces = new Map<string, string>();

  // 서명 검증을 위한 Nonce 생성
  generateNonce(body: RequestNonceDto): { nonce: string } {
    // 랜덤 문자열 생성
    const nonce = Math.random().toString(36).substring(2);
    // Nonce 저장
    this.nonces.set(body.publicKey, nonce);
    return { nonce };
  }

  // 서명 검증
  async verifySignature(sigInfo: VerifySignatureDto): Promise<{ success: boolean, token?: string }> {

    const { publicKey, nonce, signature } = sigInfo;
    const storedNonce = this.nonces.get(publicKey);
    // Nonce가 없거나 Nonce가 일치하지 않으면 에러
    if (!storedNonce || storedNonce !== nonce) {
      throw new UnauthorizedException('Invalid nonce');
    }

    console.log('nonce : ' + nonce + ' / storedNonce : ' + storedNonce);

    const message: Uint8Array = new TextEncoder().encode(nonce);
    const publicKeyBytes: Uint8Array = new PublicKey(publicKey).toBytes();

    if (!nacl.sign.detached.verify(message, Uint8Array.from(signature), publicKeyBytes)) {
      throw new UnauthorizedException('Invalid signature');
    }

    // DB에서 유저 조회 (없으면 신규 유저 생성)
    let user = await this.userRepository.findByPublicKey(publicKey);
    if (!user) {
      let nickname: string = generateRandomNickname();
      user = await this.userRepository.createUser(publicKey, nickname);
    }

    this.nonces.delete(publicKey); // Nonce 재사용 방지

    // JWT 토큰 발급 (NestJS Passport 사용)
    const token = this.generateJwtToken({ publicKey });
    console.log('token : ' + token);
    return { success: true, token };
  }
    
  generateJwtToken(user: { publicKey: string }) {
    const payload = { publicKey: user.publicKey };
    return this.jwtService.sign(payload);
  }
}
