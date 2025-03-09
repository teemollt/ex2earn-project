import { verifySolanaSignature } from "../utils/solanaUtils";  // 서명 검증 함수
import { apiCall } from "./apiService";  // API 호출

export const authenticateWallet = async ({ publicKey, message, signature }: { publicKey: string; message: string; signature: string }) => {
  try {
    console.log("🔹 백엔드로 인증 요청 전송:", { publicKey, message, signature });

    // 서명 검증 (프론트엔드에서 1차 검증)
    const isValid = verifySolanaSignature(publicKey, message, signature);
    if (!isValid) {
      throw new Error("❌ 서명 검증 실패: 전송 중단!");
    }

    // 서버 API 호출
    return await apiCall("/wallet-auth", "POST", { publicKey, message, signature });
  } catch (error) {
    console.error("❌ 인증 요청 실패:", error);
    throw error;
  }
};
