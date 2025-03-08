import { JwtService } from '@nestjs/jwt';
import { SolanaService } from '../../common/solana.service';
export declare class WalletAuthService {
    private jwtService;
    private solanaService;
    constructor(jwtService: JwtService, solanaService: SolanaService);
    authenticate(publicKey: string, message: string, signature: string): Promise<{
        token: string;
    }>;
}
