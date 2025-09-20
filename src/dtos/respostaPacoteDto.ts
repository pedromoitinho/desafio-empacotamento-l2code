import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class Empacotamento {
  @ApiProperty({
    example: 'Caixa 1',
    description: 'ID da caixa utilizada',
    nullable: true,
  })
  caixa_id!: string | null;

  @ApiProperty({ type: [String], description: 'Produtos dentro da caixa' })
  produtos!: string[];

  @ApiProperty({
    example: 'Produto não cabe em nenhuma caixa disponível.',
    description: 'Observação opcional',
    required: false,
  })
  @IsOptional()
  @IsString()
  observacao?: string;
}

class ProcessamentoPacote {
  @ApiProperty({ example: 6, description: 'ID do pedido processado' })
  @IsNumber()
  @IsNotEmpty()
  pedido_id!: number;

  @ApiProperty({
    type: [Empacotamento],
    description: 'Caixas utilizadas no pedido',
  })
  caixas!: Empacotamento[];
}

export class RespostaDto {
  @ApiProperty({ type: [ProcessamentoPacote] })
  pedidos!: ProcessamentoPacote[];
}
