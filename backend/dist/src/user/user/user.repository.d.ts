import { PrismaService } from '../../../prisma/prisma.service';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByPublicKey(publicKey: string): Promise<{
        publicKey: string;
        id: string;
        nickName: string | null;
        createdAt: Date;
    } | null>;
    createUser(publicKey: string): Promise<{
        publicKey: string;
        id: string;
        nickName: string | null;
        createdAt: Date;
    }>;
    updateNickName(publicKey: string, nickName: string): Promise<{
        publicKey: string;
        id: string;
        nickName: string | null;
        createdAt: Date;
    }>;
}
