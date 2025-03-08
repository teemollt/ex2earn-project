import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

/**
 * ✅ Solana 서명 검증 함수
 * @param publicKey 사용자의 공개 키 (Base58 인코딩된 문자열)
 * @param message 사용자가 서명한 메시지
 * @param signature 사용자가 제공한 서명 값 (Base58 인코딩)
 * @returns {boolean} 서명 검증 결과 (true: 검증 성공, false: 검증 실패)
 */
export function verifySolanaSignature(publicKey: string, message: string, signature: string): boolean {
  try {
    console.log("🔹 [solanaUtils] 서명 검증 시작:", { publicKey, message, signature });

    // ✅ 공개키, 메시지, 서명을 Uint8Array로 변환
    const publicKeyBytes = new PublicKey(publicKey).toBytes();
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);

    // ✅ Solana 서명 검증
    const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);

    console.log(isValid ? "✅ 서명 검증 성공!" : "❌ 서명 검증 실패!");

    return isValid;
  } catch (error) {
    console.error("❌ [solanaUtils] 서명 검증 중 오류 발생:", error);
    return false;
  }
}
