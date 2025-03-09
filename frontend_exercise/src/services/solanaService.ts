import { Injectable } from '@nestjs/common';
import { TextEncoder } from 'util';
import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction, Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { CONFIG } from '../config';

const SOLANA_RPC_URL = CONFIG.SOLANA_RPC_URL;
const PROGRAM_ID = CONFIG.PROGRAM_ID;
const SOLANA_PAYER_SECRET = CONFIG.SOLANA_PAYER_SECRET;

@Injectable()
export class SolanaService {
  private connection: Connection;
  private payer: Keypair;
  private programId: PublicKey;

  constructor() {
    this.connection = new Connection(SOLANA_RPC_URL, 'confirmed');
    this.programId = new PublicKey(PROGRAM_ID);

    try {
      // 비밀키 문자열을 Uint8Array로 변환
      const secretKeyArray = JSON.parse(SOLANA_PAYER_SECRET);
      this.payer = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
      console.log(`✅ Solana Payer Public Key: ${this.payer.publicKey.toBase58()}`);
    } catch (error: any) {
      // 비밀키 파싱 오류 처리
      throw new Error(`❌ SOLANA_PAYER_SECRET 파싱 오류: ${error.message}`);
    }
  }

  /**
   * Solana 서명 검증 함수
   */
  verifySignature(publicKey: string, message: string, signature: string): boolean {
    try {
      const pubKeyBytes = new PublicKey(publicKey).toBytes();
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = Buffer.from(signature, 'base64');
      return nacl.sign.detached.verify(messageBytes, signatureBytes, pubKeyBytes);
    } catch (error) {
      console.error('❌ 서명 검증 실패:', error);
      return false;
    }
  }

  /**
   * 블록체인에 스쿼트 기록 저장
   */
  async saveSquatDataOnChain(walletAddress: string, count: number): Promise<string> {
    try {
      const userPublicKey = new PublicKey(walletAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.payer.publicKey,
          toPubkey: userPublicKey,
          lamports: count * 1000, // 임의로 설정한 lamports 값
        })
      );

      const txSignature = await sendAndConfirmTransaction(this.connection, transaction, [this.payer]);
      return txSignature;
    } catch (error) {
      console.error('❌ Solana 트랜잭션 실패:', error);
      throw new Error('❌ 블록체인 기록 실패');
    }
  }
}
