import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class DimensoesDto {
  @ApiProperty({ example: 7, description: 'Altura do Produto' })
  @IsNumber()
  @IsPositive()
  altura!: number;

  @ApiProperty({ example: 10, description: 'Largura do Produto' })
  @IsNumber()
  @IsPositive()
  largura!: number;

  @ApiProperty({ example: 5, description: 'Comprimento do Produto' })
  @IsNumber()
  @IsPositive()
  comprimento!: number;
}
