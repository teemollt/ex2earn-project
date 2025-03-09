import { WalletAuthService } from './wallet-auth.service';
import { VerifySignatureDto } from '../dtos/verify-signature.dto';
import { RequestNonceDto } from '../dtos/request-nonce.dto';
export declare class WalletAuthController {
    private readonly walletAuthService;
    constructor(walletAuthService: WalletAuthService);
    generateNonce(body: RequestNonceDto): {
        nonce: string;
    };
    verifySignature(body: VerifySignatureDto): Promise<{
        success: boolean;
        token?: string;
    }>;
}
