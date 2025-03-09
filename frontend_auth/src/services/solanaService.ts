import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';

// ✅ Solana 네트워크 설정
const SOLANA_NETWORK = process.env.REACT_APP_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_NETWORK, 'confirmed');

// ✅ 테스트용 프로그램 ID (나중에 실제 프로그램 ID로 교체 필요)
const PROGRAM_ID = new PublicKey('11111111111111111111111111111111');

// ✅ Solana 트랜잭션을 생성하고 블록체인에 저장하는 함수
export const saveSquatDataOnChain = async (wallet: any, squatCount: number) => {
  if (!wallet || !wallet.publicKey) {
    throw new Error('지갑이 연결되지 않았습니다.');
  }

  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: PROGRAM_ID,
        lamports: 0,
      })
    );

    // ✅ 트랜잭션에 최근 블록해시 추가
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = wallet.publicKey;

    // ✅ 트랜잭션 서명 및 전송
    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);

    console.log(`✅ 트랜잭션 성공! 조회 링크: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    return signature;
  } catch (error) {
    console.error('❌ Solana 트랜잭션 실패:', error);
    throw error;
  }
};
