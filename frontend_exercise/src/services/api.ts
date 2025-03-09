// src/services/api.ts

import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { CONFIG } from '../config';

// Solana 연결 객체 생성
const connection = new Connection(CONFIG.SYSTEM.SOLANA_NETWORK_URL, 'confirmed'); 

export const solanaApi = {
  // 계정 잔액 조회
  getBalance: async (publicKey: string): Promise<number> => {
    const account = new PublicKey(publicKey);
    const balance = await connection.getBalance(account);
    return balance / 10 ** 9; // lamports를 SOL로 변환
  },

  // 트랜잭션 전송
  sendTransaction: async (transaction: Transaction, signers: any[]): Promise<string> => {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      signers
    );
    return signature;
  },

  // 스쿼트 기록 저장 (온체인 트랜잭션으로 구현 필요)
  saveSquatRecord: async (publicKey: string, count: number): Promise<string> => {
    // 여기에 스쿼트 기록을 온체인에 저장하는 로직 구현
    // 예: 스마트 컨트랙트 호출 등
    console.log(`Saving squat record for ${publicKey}: ${count} squats`);
    return 'transaction_signature_placeholder';
  },

  // 리워드 청구 (온체인 트랜잭션으로 구현 필요)
  claimReward: async (publicKey: string, amount: number): Promise<string> => {
    // 여기에 리워드를 청구하는 로직 구현
    // 예: 토큰 전송 트랜잭션 등
    console.log(`Claiming reward for ${publicKey}: ${amount} tokens`);
    return 'transaction_signature_placeholder';
  }
};

export default solanaApi;
