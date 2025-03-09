import { UserService } from './user.service';
import { UpdateNicknameDto } from '../dtos/update-nickname.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    }>;
    updateNickname(req: any, updateNicknameDto: UpdateNicknameDto): Promise<{
        id: string;
        publicKey: string;
        nickName: string | null;
        createdAt: Date;
    }>;
}
