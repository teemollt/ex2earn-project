import { IsString, Length } from 'class-validator';

export class RequestNonceDto {
  @IsString()
  @Length(32, 44) // Solana PublicKey 길이 (보통 32~44)
  publicKey: string;
}
