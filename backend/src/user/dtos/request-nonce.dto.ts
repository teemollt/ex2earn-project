import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RequestNonceDto {
  @ApiProperty({
    example: 'AaBbCc...',
    description: 'Solana wallet public key'
  })
  @IsString()
  @IsNotEmpty()
  publicKey: string;
}
