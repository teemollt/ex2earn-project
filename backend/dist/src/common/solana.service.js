"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaService = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
let SolanaService = class SolanaService {
    verifySignature(publicKey, message, signature) {
        try {
            const pubKey = new web3_js_1.PublicKey(publicKey).toBytes();
            const messageUint8 = new TextEncoder().encode(message);
            return tweetnacl_1.default.sign.detached.verify(messageUint8, signature, pubKey);
        }
        catch (error) {
            console.error('❌ 서명 검증 실패:', error);
            return false;
        }
    }
};
exports.SolanaService = SolanaService;
exports.SolanaService = SolanaService = __decorate([
    (0, common_1.Injectable)()
], SolanaService);
//# sourceMappingURL=solana.service.js.map