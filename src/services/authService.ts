import { PublicKey } from '@solana/web3.js';
import { apiCall } from './apiService'; // 기존 API 요청 함수 사용

export const authenticateWithWallet = async (wallet: any) => {
  if (!wallet || !wallet.publicKey) {
    throw new Error('지갑이 연결되지 않았습니다.');
  }

  const publicKey = wallet.publicKey.toBase58();
  const message = `Sign this message to authenticate: ${new Date().toISOString()}`;
  const encodedMessage = new TextEncoder().encode(message);

  try {
    const signedMessage = await wallet.signMessage(encodedMessage);
    const signature = Buffer.from(signedMessage).toString('base64');

    return await apiCall('/auth/wallet', 'POST', { publicKey, message, signature });
  } catch (error) {
    console.error('메시지 서명 실패:', error);
    throw error;
  }
};
