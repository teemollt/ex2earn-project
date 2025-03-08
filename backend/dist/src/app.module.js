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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_module_1 = require("./core/core.module");
const user_module_1 = require("./user/user.module");
const prisma_service_1 = require("../prisma/prisma.service");
const solana_service_1 = require("./common/solana.service");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
let AppModule = class AppModule {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        console.log('🔹 DATABASE_URL:', this.configService.get('DATABASE_URL'));
        console.log('🔹 JWT_SECRET:', this.configService.get('JWT_SECRET'));
        console.log('🔹 PORT:', this.configService.get('PORT'));
    }
    configure(consumer) {
        const corsOptions = {
            origin: ['http://localhost:3001', 'http://localhost:5173'],
            credentials: true,
        };
        consumer
            .apply((0, helmet_1.default)(), (0, cors_1.default)(corsOptions))
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), user_module_1.UserModule, core_module_1.CoreModule],
        providers: [config_1.ConfigService, prisma_service_1.PrismaService, solana_service_1.SolanaService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map