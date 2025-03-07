import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateNicknameDto } from '../dtos/update-nickname.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth 
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: '사용자 프로필 조회' })
  @ApiResponse({ 
    status: 200, 
    description: '프로필 조회 성공',
    schema: {
      example: {
        id: 'cuid123',
        publicKey: 'solana-public-key',
        nickName: '사용자닉네임',
        createdAt: '2024-03-14T12:00:00Z'
      }
    }
  })
  async getProfile(@Request() req) {
    return this.userService.getUserProfile(req.user.publicKey);
  }

  @Put('nickname')
  @ApiOperation({ summary: '닉네임 업데이트' })
  @ApiResponse({ 
    status: 200, 
    description: '닉네임 업데이트 성공',
    schema: {
      example: {
        id: 'cuid123',
        publicKey: 'solana-public-key',
        nickName: '새로운닉네임',
        createdAt: '2024-03-14T12:00:00Z'
      }
    }
  })
  async updateNickname(
    @Request() req,
    @Body() updateNicknameDto: UpdateNicknameDto,
  ) {
    return this.userService.updateNickname(req.user.publicKey, updateNicknameDto);
  }
}
