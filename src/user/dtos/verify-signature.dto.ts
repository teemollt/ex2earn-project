import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifySignatureDto {
  @ApiProperty({
    example: 'AaBbCc...',
    description: 'Solana wallet public key'
  })
  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty({
    example: 'xyz123...',
    description: 'Nonce received from /nonce endpoint'
  })
  @IsString()
  @IsNotEmpty()
  nonce: string;

  @ApiProperty({
    example: '[1,2,3...]',
    description: 'Signature bytes array'
  })
  @IsNotEmpty()
  signature: number[];
}
