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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_nickname_dto_1 = require("../dtos/update-nickname.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(req) {
        return this.userService.getUserProfile(req.user.publicKey);
    }
    async updateNickname(req, updateNicknameDto) {
        return this.userService.updateNickname(req.user.publicKey, updateNicknameDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: '사용자 프로필 조회' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '프로필 조회 성공',
        schema: {
            example: {
                id: 'cuid123',
                publicKey: 'solana-public-key',
                nickName: '사용자닉네임',
                createdAt: '2024-03-14T12:00:00Z'
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('nickname'),
    (0, swagger_1.ApiOperation)({ summary: '닉네임 업데이트' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '닉네임 업데이트 성공',
        schema: {
            example: {
                id: 'cuid123',
                publicKey: 'solana-public-key',
                nickName: '새로운닉네임',
                createdAt: '2024-03-14T12:00:00Z'
            }
        }
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_nickname_dto_1.UpdateNicknameDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateNickname", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map