import { Test, TestingModule } from '@nestjs/testing';
import { WalletAuthController } from './wallet-auth.controller';

describe('WalletAuthController', () => {
  let controller: WalletAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAuthController],
    }).compile();

    controller = module.get<WalletAuthController>(WalletAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
