import { Injectable } from '@nestjs/common';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

@Injectable()
export class SolanaService {
  /**
   * ✅ Solana 서명 검증 함수
   */
  verifySignature(
    publicKey: string,
    message: string,
    signature: Uint8Array,
  ): boolean {
    try {
      const pubKey = new PublicKey(publicKey).toBytes();
      const messageUint8 = new TextEncoder().encode(message);
      return nacl.sign.detached.verify(messageUint8, signature, pubKey);
    } catch (error) {
      console.error('❌ 서명 검증 실패:', error);
      return false;
    }
  }
}
