import { Test, TestingModule } from '@nestjs/testing';
import { SinavDetayService } from './sinav-detay.service';

describe('SinavDetayService', () => {
  let service: SinavDetayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinavDetayService],
    }).compile();

    service = module.get<SinavDetayService>(SinavDetayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
