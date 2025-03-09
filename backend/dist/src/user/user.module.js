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
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const leaderboard_controller_1 = require("./leaderboard/leaderboard.controller");
const leaderboard_service_1 = require("./leaderboard/leaderboard.service");
const user_repository_1 = require("./user/user.repository");
const jwt_1 = require("@nestjs/jwt");
const wallet_auth_controller_1 = require("./wallet-auth/wallet-auth.controller");
const wallet_auth_service_1 = require("./wallet-auth/wallet-auth.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./guards/jwt.strategy");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '7d' },
                }),
            }),
        ],
        providers: [user_service_1.UserService, leaderboard_service_1.LeaderboardService, user_repository_1.UserRepository, wallet_auth_service_1.WalletAuthService, jwt_strategy_1.JwtStrategy],
        controllers: [user_controller_1.UserController, leaderboard_controller_1.LeaderboardController, wallet_auth_controller_1.WalletAuthController],
        exports: [wallet_auth_service_1.WalletAuthService, jwt_1.JwtModule]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map