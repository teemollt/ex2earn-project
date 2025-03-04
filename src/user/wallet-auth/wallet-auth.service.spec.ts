import { Test, TestingModule } from '@nestjs/testing';
import { WalletAuthService } from './wallet-auth.service';
// import { PrismaService } from 'prisma/prisma.service';
import * as nacl from 'tweetnacl';
import * as sol from '@solana/web3.js';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';

// UserRepository의 Mock 버전 생성
const mockUserRepository = {
  findByPublicKey: jest.fn().mockResolvedValue(null),
  createUser: jest.fn().mockResolvedValue({ publicKey: 'testPublicKey' }),
};

describe('WalletAuthService', () => {
  let service: WalletAuthService;
  // let prisma: PrismaService;
  let keypair: sol.Keypair;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletAuthService,
        JwtService,
        { provide: UserRepository, useValue: mockUserRepository }, // Mock Repository 주입
      ],
    }).compile();

    service = module.get<WalletAuthService>(WalletAuthService);
    keypair = sol.Keypair.generate();
  });

  it('should verify signature correctly', async () => {
    // Nonce 생성
    const { nonce } = service.generateNonce(keypair.publicKey.toBase58());

    // Nonce에 서명 (Signature 생성)
    const message = new TextEncoder().encode(nonce);
    console.log("nonce: " + nonce + " / msg : " + message);
    const signature = nacl.sign.detached(message, keypair.secretKey);
    
    // console.log('sign : ' + signature.toString());
    // 서명 검증 테스트
    const result = await service.verifySignature(
      keypair.publicKey.toBase58(),
      Array.from(signature), // Uint8Array를 배열로 변환
      nonce
    );

    console.log('@@ : ' + result.token + ' @@@ : ' + result.success);
    // expect(result).toHaveProperty('success', true);
    // expect(result).toHaveProperty('token'); // JWT 토큰 발급 확인
  });

  it('should fail with invalid signature', async () => {
    const { nonce } = service.generateNonce(keypair.publicKey.toBase58());

    // 잘못된 서명 생성 (임의의 데이터 서명)
    const wrongMessage = new TextEncoder().encode('wrong nonce');
    const wrongSignature = nacl.sign.detached(wrongMessage, keypair.secretKey);

    await expect(
      service.verifySignature(
        keypair.publicKey.toBase58(),
        Array.from(wrongSignature),
        nonce
      )
    ).rejects.toThrow('Invalid signature');
  });

  it('should fail with invalid nonce', async () => {
    const { nonce } = service.generateNonce(keypair.publicKey.toBase58());

    // Nonce에 서명 (정상 서명)
    const message = new TextEncoder().encode(nonce);
    const signature = nacl.sign.detached(message, keypair.secretKey);

    // 잘못된 Nonce 전달하여 검증 실패 테스트
    await expect(
      service.verifySignature(
        keypair.publicKey.toBase58(),
        Array.from(signature),
        'wrong nonce'
      )
    ).rejects.toThrow('Invalid nonce');
  });
});
