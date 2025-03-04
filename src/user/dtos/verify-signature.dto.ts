import { IsString, IsArray, Length } from 'class-validator';

export class VerifySignatureDto {
  @IsString()
  @Length(32, 44) // Solana PublicKey 길이
  publicKey: string;

  @IsString()
  nonce: string;

  @IsArray()
  signature: number[]; // Uint8Array 형태의 서명
}
