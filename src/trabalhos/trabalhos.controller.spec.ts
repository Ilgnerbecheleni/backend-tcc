import { Test, TestingModule } from '@nestjs/testing';
import { TrabalhosController } from './trabalhos.controller';
import { TrabalhosService } from './trabalhos.service';

describe('TrabalhosController', () => {
  let controller: TrabalhosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrabalhosController],
      providers: [TrabalhosService],
    }).compile();

    controller = module.get<TrabalhosController>(TrabalhosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
