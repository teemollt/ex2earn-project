import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// 서명 메시지 생성 (백엔드와 동일한 형식이어야 함)
export const generateSignMessage = (walletAddress: string): string => {
  const timestamp = new Date().getTime();
  return `Sign this message to authenticate with Ex2Earn: ${walletAddress} at ${timestamp}`;
};

// 지갑으로 메시지 서명 및 백엔드 인증
export const authenticateWithWallet = async (wallet: WalletContextState): Promise<string> => {
  try {
    if (!wallet.publicKey || !wallet.signMessage) {
      throw new Error('Wallet not connected or does not support message signing');
    }

    // 서명할 메시지 생성
    const message = generateSignMessage(wallet.publicKey.toString());
    const messageBytes = new TextEncoder().encode(message);

    // 메시지 서명
    const signature = await wallet.signMessage(messageBytes);
    
    // 백엔드로 서명 전송하여 JWT 토큰 받기
    const response = await axios.post(`${API_URL}/auth/wallet-login`, {
      publicKey: wallet.publicKey.toString(),
      message,
      signature: Buffer.from(signature).toString('base64')
    });

    return response.data.token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

// JWT 토큰으로 인증된 API 요청 헤더 생성
export const getAuthHeader = (token: string | null) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
