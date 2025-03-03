import { Injectable, UnauthorizedException } from '@nestjs/common';
import nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class WalletAuthService {
  constructor(
    private readonly userRepository: UserRepository, 
    private readonly jwtService: JwtService) {}

  private nonces = new Map<string, string>();

  generateNonce(publicKey: string): { nonce: string } {
    const nonce = Math.random().toString(36).substring(2);
    this.nonces.set(publicKey, nonce);
    return { nonce };
  }

  async verifySignature(publicKey: string, signature: number[], nonce: string) {
    const storedNonce = this.nonces.get(publicKey);
    if (!storedNonce || storedNonce !== nonce) {
      throw new UnauthorizedException('Invalid nonce');
    }

    const message = new TextEncoder().encode(nonce);
    const publicKeyBytes = new PublicKey(publicKey).toBytes();
    
    if (!nacl.sign.detached.verify(message, new Uint8Array(signature), publicKeyBytes)) {
      throw new UnauthorizedException('Invalid signature');
    }


    // DB에서 유저 조회 (없으면 신규 유저 생성)
    let user = await this.userRepository.findByPublicKey(publicKey);
    if (!user) {
      user = await this.userRepository.createUser(publicKey);
    }

    this.nonces.delete(publicKey); // Nonce 재사용 방지

    // JWT 토큰 발급 (NestJS Passport 사용)
    const token = this.generateJwtToken({ publicKey });
    return { success: true, token };
  }

    // 로그인 처리 (서명 검증 후 JWT 발급)
    login(publicKey: string, signature: number[]): string {
        const message = `Login with Solana: ${publicKey}`; // 고정 메시지
    
        if (!this.verifySignature(publicKey, signature, message)) {
          throw new UnauthorizedException('Invalid Signature');
        }
    
        return this.generateJwtToken({ publicKey });
      }
    
      generateJwtToken(user: { publicKey: string }) {
        const payload = { publicKey: user.publicKey };
        return this.jwtService.sign(payload);
      }
}
