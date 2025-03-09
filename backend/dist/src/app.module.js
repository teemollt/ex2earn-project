"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_module_1 = require("./core/core.module");
const user_module_1 = require("./user/user.module");
const prisma_service_1 = require("../prisma/prisma.service");
const solana_service_1 = require("./common/solana.service");
const helmet_1 = require("helmet");
const morgan = require("morgan");
let AppModule = class AppModule {
    isDev = process.env.MODE === 'dev' ? true : false;
    configure(consumer) {
        consumer
            .apply((0, helmet_1.default)({
            contentSecurityPolicy: false,
        }), morgan('dev'))
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true,
                envFilePath: ['.env'] }),
            user_module_1.UserModule,
            core_module_1.CoreModule,
        ],
        providers: [prisma_service_1.PrismaService, solana_service_1.SolanaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map