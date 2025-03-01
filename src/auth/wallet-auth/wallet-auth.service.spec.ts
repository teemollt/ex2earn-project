import { Test, TestingModule } from '@nestjs/testing';
import { WalletAuthService } from './wallet-auth.service';

describe('WalletAuthService', () => {
  let service: WalletAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletAuthService],
    }).compile();

    service = module.get<WalletAuthService>(WalletAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
