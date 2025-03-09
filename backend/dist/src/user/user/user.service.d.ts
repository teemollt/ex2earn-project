import { UserRepository } from './user.repository';
import { UpdateNicknameDto } from '../dtos/update-nickname.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getUserProfile(publicKey: string): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    }>;
    updateNickname(publicKey: string, updateNicknameDto: UpdateNicknameDto): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    }>;
}
