"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_auth_controller_1 = require("./wallet-auth/wallet-auth.controller");
const wallet_auth_service_1 = require("./wallet-auth/wallet-auth.service");
const solana_service_1 = require("../common/solana.service");
const jwt_1 = require("@nestjs/jwt");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({ secret: 'your_jwt_secret' })],
        controllers: [wallet_auth_controller_1.WalletAuthController],
        providers: [wallet_auth_service_1.WalletAuthService, solana_service_1.SolanaService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map