import {
  Controller,
  Get,
  ValidationPipe,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EmpacotamentoService } from '../services/empacotamentoService';
import { RequisicaoDto } from '../dtos/requisicaoPacoteDto';
import { RespostaDto } from '../dtos/respostaPacoteDto';
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiHeader } from '@nestjs/swagger';
import { ApiKeyGuard } from '../guards/api-key.guard';

@ApiTags('Empacotamento')
@ApiHeader({ name: 'x-api-key', description: 'API Key para autenticação - test-api-key-123', required: true, example: 'test-api-key-123' })
@UseGuards(ApiKeyGuard)
@Controller('/empacotamento')
export class EmpacotamentoController {
  constructor(private readonly EmpacotamentoService: EmpacotamentoService) {}

  @Get('healthcheck')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Checa se a API está funcionando' })
  @ApiResponse({ status: 200, description: 'API Funcionando.' })
  healthCheck() {
    return this.EmpacotamentoService.healthCheck();
  }

  @Post('processamento')
  @ApiOperation({
    summary: 'Procesamento para determinar o melhor encaixotamento',
  })
  @ApiBody({
    type: RequisicaoDto,
    description: 'Request com a lista de pedidos',
  })
  @ApiResponse({
    status: 201,
    description: 'Pedidos processados com sucesso.',
    type: RespostaDto,
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  processamentoCaixa(@Body(new ValidationPipe()) requisicao: RequisicaoDto) {
    return {
      pedidos: this.EmpacotamentoService.processamentoCaixa(requisicao.pedidos),
    };
  }
}
