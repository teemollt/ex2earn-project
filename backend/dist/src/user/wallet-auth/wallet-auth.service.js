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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAuthService = void 0;
const common_1 = require("@nestjs/common");
const nacl = require("tweetnacl");
const web3_js_1 = require("@solana/web3.js");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../user/user.repository");
const nickname_generator_1 = require("../../utils/nickname-generator");
let WalletAuthService = class WalletAuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    nonces = new Map();
    generateNonce(body) {
        const nonce = Math.random().toString(36).substring(2);
        this.nonces.set(body.publicKey, nonce);
        return { nonce };
    }
    async verifySignature(sigInfo) {
        const { publicKey, nonce, signature } = sigInfo;
        const storedNonce = this.nonces.get(publicKey);
        if (!storedNonce || storedNonce !== nonce) {
            throw new common_1.UnauthorizedException('Invalid nonce');
        }
        const message = new TextEncoder().encode(nonce);
        const publicKeyBytes = new web3_js_1.PublicKey(publicKey).toBytes();
        if (!nacl.sign.detached.verify(message, Uint8Array.from(signature), publicKeyBytes)) {
            throw new common_1.UnauthorizedException('Invalid signature');
        }
        let user = await this.userRepository.findByPublicKey(publicKey);
        if (!user) {
            let nickname = (0, nickname_generator_1.generateRandomNickname)();
            user = await this.userRepository.createUser(publicKey, nickname);
        }
        this.nonces.delete(publicKey);
        const token = this.generateJwtToken({ publicKey });
        return { success: true, token };
    }
    generateJwtToken(user) {
        const payload = { publicKey: user.publicKey };
        return this.jwtService.sign(payload);
    }
};
exports.WalletAuthService = WalletAuthService;
exports.WalletAuthService = WalletAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], WalletAuthService);
//# sourceMappingURL=wallet-auth.service.js.map