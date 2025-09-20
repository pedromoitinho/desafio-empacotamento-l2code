import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { OrdemDto } from './ordemDto';

export class RequisicaoDto {
  @ApiProperty({
    example: [OrdemDto],
    type: [OrdemDto],
    description: 'Lista de pedidos processados',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => OrdemDto)
  pedidos!: OrdemDto[];
}
