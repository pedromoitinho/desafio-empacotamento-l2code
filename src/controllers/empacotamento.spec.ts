import { Test, TestingModule } from '@nestjs/testing';
import { EmpacotamentoController } from './empacotamento';
import { EmpacotamentoService } from '../services/empacotamentoService';

describe('EmpacotamentoController', () => {
  let controller: EmpacotamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpacotamentoController],
      providers: [EmpacotamentoService],
    }).compile();

    controller = module.get<EmpacotamentoController>(EmpacotamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health check message', () => {
    const result = controller.healthCheck();
    expect(result).toEqual({ message: 'Health Check Ok' });
  });
});
