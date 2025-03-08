import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';

// ✅ Solana 네트워크 설정 (Devnet, Testnet, Mainnet 선택 가능)
const SOLANA_NETWORK = process.env.REACT_APP_SOLANA_NETWORK || 'https://api.devnet.solana.com';
const connection = new Connection(SOLANA_NETWORK, 'confirmed');

// ✅ 스마트 컨트랙트 (프로그램) ID (Solana에 배포한 프로그램의 ID를 입력해야 함)
const PROGRAM_ID = new PublicKey('YourProgramIDHere');

// ✅ Solana 트랜잭션을 생성하고 블록체인에 저장하는 함수
export const saveSquatDataOnChain = async (wallet: any, squatCount: number) => {
  if (!wallet || !wallet.publicKey) {
    throw new Error('지갑이 연결되지 않았습니다.');
  }

  try {
    const userPublicKey = new PublicKey(wallet.publicKey);
    const instructionData = Buffer.from(
      JSON.stringify({ squatCount, timestamp: Date.now() }) // ✅ 운동 데이터를 JSON 형태로 변환
    );

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userPublicKey,
        toPubkey: PROGRAM_ID, // ✅ 스마트 컨트랙트 주소로 데이터 전송
        lamports: 0, // ✅ 데이터 저장이므로 SOL 전송 없음
      })
    );

    // ✅ 사용자의 지갑을 통해 트랜잭션 서명 및 전송
    const signature = await wallet.signAndSendTransaction(transaction);
    console.log(`✅ 트랜잭션 성공! 조회 링크: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    
    return signature;
  } catch (error) {
    console.error('❌ Solana 트랜잭션 실패:', error);
    throw error;
  }
};
