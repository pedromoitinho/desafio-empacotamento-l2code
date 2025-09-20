import { Module } from '@nestjs/common';
import { EmpacotamentoController } from './controllers/empacotamento';
import { EmpacotamentoService } from './services/empacotamentoService';

@Module({
  imports: [],
  controllers: [EmpacotamentoController],
  providers: [EmpacotamentoService],
})
export class AppModule {}
