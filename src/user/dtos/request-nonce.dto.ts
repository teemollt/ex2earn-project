import { IsString, Length } from 'class-validator';

export class RequestNonceDto {
  @IsString()
  @Length(32, 44) // Solana PublicKey 
  publicKey: string;
}
