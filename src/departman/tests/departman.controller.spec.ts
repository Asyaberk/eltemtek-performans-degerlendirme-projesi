import { Test, TestingModule } from '@nestjs/testing';
import { DepartmanController } from './departman.controller';

describe('DepartmanController', () => {
  let controller: DepartmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmanController],
    }).compile();

    controller = module.get<DepartmanController>(DepartmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
