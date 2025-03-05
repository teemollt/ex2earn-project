import { Test, TestingModule } from '@nestjs/testing';
import { WalletAuthService } from './wallet-auth.service';
// import { PrismaService } from 'prisma/prisma.service';
import * as nacl from 'tweetnacl';
import * as sol from '@solana/web3.js';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerifySignatureDto } from '../dtos/verify-signature.dto';

const mockUserRepository = {
  findByPublicKey: jest.fn().mockResolvedValue(null),
  createUser: jest.fn().mockResolvedValue({ publicKey: 'testPublicKey' }),
};

describe('WalletAuthService', () => {
  let service: WalletAuthService;
  let keypair: sol.Keypair;
  let configService: ConfigService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test', '.env'], // 테스트용 또는 기본 환경 설정 파일 우선 사용
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET') || 'test-secret-key', 
            signOptions: { expiresIn: '7d' },
          }),
        }),
      ],
      providers: [
        WalletAuthService,
        { 
          provide: UserRepository, 
          useValue: mockUserRepository 
        },
      ],
    }).compile();

    service = module.get<WalletAuthService>(WalletAuthService);
    configService = module.get<ConfigService>(ConfigService);
    keypair = sol.Keypair.generate();
  });

  it('should verify signature correctly', async () => {
    // Nonce 생성
    const { nonce } = service.generateNonce(keypair.publicKey.toBase58());

    // Nonce에 서명 (Signature 생성)
    const message = new TextEncoder().encode(nonce);
    console.log("nonce: " + nonce + " / msg : " + message);
    const signature: Uint8Array = nacl.sign.detached(message, keypair.secretKey);
    
    console.log('sign : ' + signature.toString());

    Array.from

    const data: VerifySignatureDto = {
      publicKey: keypair.publicKey.toBase58(),
      nonce,
      signature: Array.from(signature)
    };
    // 서명 검증 테스트
    const result = await service.verifySignature(data);

    console.log('@@ : ' + result.token + ' @@@ : ' + result.success);
    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('token'); // JWT 토큰 발급 확인
  });

  it('should fail with invalid signature', async () => {
    const { nonce } = service.generateNonce(keypair.publicKey.toBase58());

    // 잘못된 서명 생성 (임의의 데이터 서명)
    const wrongMessage = new TextEncoder().encode('wrong nonce');
    const wrongSignature = nacl.sign.detached(wrongMessage, keypair.secretKey);

    const data: VerifySignatureDto = {
      publicKey: keypair.publicKey.toBase58(),
      nonce,
      signature: Array.from(wrongSignature)
    };
    await expect(
      service.verifySignature(data)
    ).rejects.toThrow('Invalid signature');
  });

  it('should fail with invalid nonce', async () => {
    const { nonce } = service.generateNonce(keypair.publicKey.toBase58());

    // Nonce에 서명 (정상 서명)
    const message = new TextEncoder().encode(nonce);
    const signature = nacl.sign.detached(message, keypair.secretKey);

    const data: VerifySignatureDto = {
      publicKey: keypair.publicKey.toBase58(),
      nonce: 'wrong nonce',
      signature: Array.from(signature)
    };
    // 잘못된 Nonce 전달하여 검증 실패 테스트
    await expect(
      service.verifySignature(data)
    ).rejects.toThrow('Invalid nonce');
  });
});
