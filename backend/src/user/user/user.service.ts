import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateNicknameDto } from '../dtos/update-nickname.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfile(publicKey: string) {
    const user = await this.userRepository.findByPublicKey(publicKey);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateNickname(publicKey: string, updateNicknameDto: UpdateNicknameDto) {
    const user = await this.userRepository.findByPublicKey(publicKey);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updateNickName(publicKey, updateNicknameDto.nickname);
  }
}
