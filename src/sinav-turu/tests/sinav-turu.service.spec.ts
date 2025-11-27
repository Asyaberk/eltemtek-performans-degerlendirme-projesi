import { Test, TestingModule } from '@nestjs/testing';
import { SinavTuruService } from './service/sinav-turu.service';

describe('SinavTuruService', () => {
  let service: SinavTuruService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinavTuruService],
    }).compile();

    service = module.get<SinavTuruService>(SinavTuruService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
