import { Test, TestingModule } from '@nestjs/testing';
import { DepartmanService } from './departman.service';

describe('DepartmanService', () => {
  let service: DepartmanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmanService],
    }).compile();

    service = module.get<DepartmanService>(DepartmanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
