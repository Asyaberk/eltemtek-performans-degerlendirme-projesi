import { Test, TestingModule } from '@nestjs/testing';
import { SinavDetayController } from './sinav-detay.controller';

describe('SinavDetayController', () => {
  let controller: SinavDetayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinavDetayController],
    }).compile();

    controller = module.get<SinavDetayController>(SinavDetayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
