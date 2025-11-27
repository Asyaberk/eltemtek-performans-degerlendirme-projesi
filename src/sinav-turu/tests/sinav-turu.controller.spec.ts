import { Test, TestingModule } from '@nestjs/testing';
import { SinavTuruController } from './sinav-turu.controller';

describe('SinavTuruController', () => {
  let controller: SinavTuruController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinavTuruController],
    }).compile();

    controller = module.get<SinavTuruController>(SinavTuruController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
