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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAuthController = void 0;
const common_1 = require("@nestjs/common");
const wallet_auth_service_1 = require("./wallet-auth.service");
const verify_signature_dto_1 = require("../dtos/verify-signature.dto");
const request_nonce_dto_1 = require("../dtos/request-nonce.dto");
const swagger_1 = require("@nestjs/swagger");
let WalletAuthController = class WalletAuthController {
    walletAuthService;
    constructor(walletAuthService) {
        this.walletAuthService = walletAuthService;
    }
    generateNonce(body) {
        return this.walletAuthService.generateNonce(body);
    }
    verifySignature(body) {
        return this.walletAuthService.verifySignature(body);
    }
};
exports.WalletAuthController = WalletAuthController;
__decorate([
    (0, common_1.Post)('nonce'),
    (0, swagger_1.ApiOperation)({ summary: 'Get nonce for wallet signature' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nonce generated successfully',
        schema: {
            example: {
                nonce: 'random-string-here'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_nonce_dto_1.RequestNonceDto]),
    __metadata("design:returntype", void 0)
], WalletAuthController.prototype, "generateNonce", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify wallet signature' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Signature verified successfully',
        schema: {
            example: {
                success: true,
                token: 'jwt-token-here'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_signature_dto_1.VerifySignatureDto]),
    __metadata("design:returntype", void 0)
], WalletAuthController.prototype, "verifySignature", null);
exports.WalletAuthController = WalletAuthController = __decorate([
    (0, swagger_1.ApiTags)('Wallet Auth'),
    (0, common_1.Controller)('wallet-auth'),
    __metadata("design:paramtypes", [wallet_auth_service_1.WalletAuthService])
], WalletAuthController);
//# sourceMappingURL=wallet-auth.controller.js.map