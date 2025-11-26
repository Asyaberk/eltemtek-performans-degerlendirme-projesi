import { PartialType } from '@nestjs/mapped-types'; // Veya @nestjs/swagger
import { CreateDepartmanDto } from './createDepartman.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDepartmanDto extends PartialType(CreateDepartmanDto) {
  @ApiPropertyOptional({
    description: 'Yeni departman adı',
    example: 'AR-GE',
  })
  name?: string;
}
