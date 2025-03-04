import BN from 'bn.js';
import { Connection, PublicKey, TransactionInstruction, Transaction } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const programId = new PublicKey('YourProgramIDHere');

export async function saveSquatData(walletPublicKey: PublicKey, squatCount: number) {
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: walletPublicKey, isSigner: true, isWritable: true }],
    programId,
    data: Buffer.from(Uint8Array.of(0, ...new BN(squatCount).toArray('le', 8))), // 데이터 인코딩
  });

  const transaction = new Transaction().add(instruction);

  try {
    const signature = await (window as any).solana.signAndSendTransaction(transaction);
    console.log('Transaction successful:', signature);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}
