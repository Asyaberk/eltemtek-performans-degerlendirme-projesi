import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {

  @IsString({ message: 'Rol adı string olmalıdır.' })
  @IsNotEmpty({ message: 'Rol adı boş olamaz.' })
  name: string;
}
