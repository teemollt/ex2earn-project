import { JwtService } from '@nestjs/jwt';
import { SolanaService } from '../../common/solana.service';
export declare class WalletAuthController {
    private jwtService;
    private solanaService;
    constructor(jwtService: JwtService, solanaService: SolanaService);
    authenticate(body: {
        publicKey: string;
        message: string;
        signature: string;
    }): Promise<{
        message: string;
        token: string;
    }>;
}
