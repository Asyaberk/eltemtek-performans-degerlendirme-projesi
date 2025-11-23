import { Test, TestingModule } from '@nestjs/testing';
import { SinavService } from './sinav.service';

describe('SinavService', () => {
  let service: SinavService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinavService],
    }).compile();

    service = module.get<SinavService>(SinavService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
