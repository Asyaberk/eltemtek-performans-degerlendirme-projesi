import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmanDto {
  @ApiProperty({
    description: 'Departman adı',
    example: 'Müdürlük',
    minLength: 1,
  })
  @IsString({ message: 'Departman adı string olmalıdır.' })
  @IsNotEmpty({ message: 'Departman adı boş olamaz.' })
  name: string;
}
