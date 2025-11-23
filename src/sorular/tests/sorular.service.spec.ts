import { Test, TestingModule } from '@nestjs/testing';
import { SorularService } from './sorular.service';

describe('SorularService', () => {
  let service: SorularService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorularService],
    }).compile();

    service = module.get<SorularService>(SorularService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
