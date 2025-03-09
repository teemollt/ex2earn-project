import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { VerifySignatureDto } from '../dtos/verify-signature.dto';
import { RequestNonceDto } from '../dtos/request-nonce.dto';
export declare class WalletAuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    private nonces;
    generateNonce(body: RequestNonceDto): {
        nonce: string;
    };
    verifySignature(sigInfo: VerifySignatureDto): Promise<{
        success: boolean;
        token?: string;
    }>;
    generateJwtToken(user: {
        publicKey: string;
    }): string;
}
