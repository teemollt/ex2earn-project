import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNicknameDto {
  @ApiProperty({
    example: '새로운닉네임',
    description: '사용자 닉네임',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @Length(2, 20)
  nickname: string;
} 