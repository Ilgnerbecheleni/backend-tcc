import { Test, TestingModule } from '@nestjs/testing';
import { TrabalhosService } from './trabalhos.service';

describe('TrabalhosService', () => {
  let service: TrabalhosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrabalhosService],
    }).compile();

    service = module.get<TrabalhosService>(TrabalhosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
