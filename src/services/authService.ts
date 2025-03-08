import { WalletContextState } from '@solana/wallet-adapter-react';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_URL;

// API URL이 설정되어 있지 않은 경우 에러 처리
if (!API_BASE_URL) {
  throw new Error('API URL이 환경 변수에 설정되어 있지 않습니다. (.env 파일을 확인해주세요)');
}

interface VerifyResponse {
  success: boolean;
  token: string;
}

export const authenticateWithWallet = async (wallet: WalletContextState): Promise<string> => {
  if (!wallet.publicKey || !wallet.signMessage) {
    throw new Error('지갑이 연결되지 않았거나 서명 기능을 지원하지 않습니다.');
  }

  try {
    // 1. Nonce 요청
    console.log('Nonce 요청 중...');
    const nonceResponse = await axios.post(`${API_BASE_URL}/wallet-auth/nonce`, {
      publicKey: wallet.publicKey.toString()
    });

    if (!nonceResponse.data.nonce) {
      throw new Error('Nonce를 받아오지 못했습니다.');
    }

    const nonce = nonceResponse.data.nonce;
    console.log('Nonce 받음:', nonce);

    // 2. Nonce에 서명 (여기서 Phantom 지갑 팝업이 나타남)
    console.log('✍️ 지갑 서명 요청 중...');
    const messageBytes = new TextEncoder().encode(nonce);
    const signature = await wallet.signMessage(messageBytes);
    console.log('✅ 서명 완료');

    // 3. 서명 검증 요청
    console.log('서명 검증 요청 중...');
    const verifyResponse = await axios.post<VerifyResponse>(`${API_BASE_URL}/wallet-auth/verify`, {
      publicKey: wallet.publicKey.toString(),
      nonce: nonce,
      signature: Array.from(signature)
    });

    console.log('서버 응답:', verifyResponse.data);

    if (verifyResponse.data.success) {
      // JWT 토큰 저장
      const token = verifyResponse.data.token;
      localStorage.setItem('jwtToken', token);
      return token;
    } else {
      throw new Error('서명 검증에 실패했습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 오류:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`API 요청 실패: ${error.response?.data?.message || error.message}`);
    }
    if (error instanceof Error) {
      console.error('인증 실패:', error.message);
      throw new Error(`인증 실패: ${error.message}`);
    }
    throw error;
  }
};

// API 요청에 JWT 토큰을 포함시키는 axios 인스턴스 생성
export const authenticatedAxios = axios.create({
  baseURL: API_BASE_URL
});

// 요청 인터셉터 추가
authenticatedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
