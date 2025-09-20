import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ProdutoDto } from './produtoDto';

export class OrdemDto {
  @ApiProperty({ example: 6, description: 'Identificador do pedido' })
  @IsNumber()
  @IsNotEmpty()
  pedido_id!: number;

  @ApiProperty({ example: [ProdutoDto], description: 'Lista de produtos' })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProdutoDto)
  produtos!: ProdutoDto[];
}
