import { Test, TestingModule } from '@nestjs/testing';
import { SinavController } from './sinav.controller';

describe('SinavController', () => {
  let controller: SinavController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinavController],
    }).compile();

    controller = module.get<SinavController>(SinavController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
