import { Test, TestingModule } from '@nestjs/testing';
import { SorularController } from './sorular.controller';

describe('SorularController', () => {
  let controller: SorularController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SorularController],
    }).compile();

    controller = module.get<SorularController>(SorularController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
