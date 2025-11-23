import { Test, TestingModule } from '@nestjs/testing';
import { SoruAgirlikController } from './soru-agirlik.controller';

describe('SoruAgirlikController', () => {
  let controller: SoruAgirlikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoruAgirlikController],
    }).compile();

    controller = module.get<SoruAgirlikController>(SoruAgirlikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
