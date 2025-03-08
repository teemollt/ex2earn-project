"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bs58_1 = __importDefault(require("bs58"));
const solana_service_1 = require("../../common/solana.service");
let WalletAuthService = class WalletAuthService {
    jwtService;
    solanaService;
    constructor(jwtService, solanaService) {
        this.jwtService = jwtService;
        this.solanaService = solanaService;
    }
    async authenticate(publicKey, message, signature) {
        console.log('🔹 받은 데이터:', { publicKey, message, signature });
        const decodedSignature = bs58_1.default.decode(signature);
        const isValidSignature = this.solanaService.verifySignature(publicKey, message, decodedSignature);
        if (!isValidSignature) {
            console.error('❌ 서명 검증 실패! 401 Unauthorized 반환');
            throw new common_1.UnauthorizedException('Invalid wallet signature.');
        }
        console.log('✅ 서명 검증 성공! JWT 토큰 생성 중...');
        const payload = { publicKey };
        const accessToken = this.jwtService.sign(payload);
        return { token: accessToken };
    }
};
exports.WalletAuthService = WalletAuthService;
exports.WalletAuthService = WalletAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        solana_service_1.SolanaService])
], WalletAuthService);
//# sourceMappingURL=wallet-auth.service.js.map