import { Test, TestingModule } from '@nestjs/testing';
import { SoruAgirlikService } from './soru-agirlik.service';

describe('SoruAgirlikService', () => {
  let service: SoruAgirlikService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoruAgirlikService],
    }).compile();

    service = module.get<SoruAgirlikService>(SoruAgirlikService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
