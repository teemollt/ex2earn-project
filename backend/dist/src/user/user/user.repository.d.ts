import { PrismaService } from '../../../prisma/prisma.service';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByPublicKey(publicKey: string): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    } | null>;
    createUser(publicKey: string, nickName: string): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    }>;
    updateNickName(publicKey: string, nickName: string): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    }>;
}
