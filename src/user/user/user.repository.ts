import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByPublicKey(publicKey: string) {
    return this.prisma.user.findUnique({ where: { publicKey } });
  }

  async createUser(publicKey: string, nickName: string | null) {
    return this.prisma.user.create({ data: { publicKey } });
  }

  async updateNickName(publicKey: string, nickName: string) {
    return this.prisma.user.update({
      where: { publicKey },
      data: { nickName }
    });
  }
}
