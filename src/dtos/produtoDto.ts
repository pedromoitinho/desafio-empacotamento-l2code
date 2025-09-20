import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DimensoesDto } from './dimensoesDto';

export class ProdutoDto {
  @ApiProperty({ example: 'Webcam', description: 'Identificador do Produto' })
  @IsString()
  @IsNotEmpty()
  produto_id!: string;

  @ApiProperty({ type: DimensoesDto, description: 'Dimensões do Produto' })
  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes!: DimensoesDto;
}
