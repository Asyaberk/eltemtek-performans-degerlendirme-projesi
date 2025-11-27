import { IsNotEmpty, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreatePersonelDto {
  @IsString({ message: 'Sicil numarası string olmalıdır.' })
  @IsNotEmpty({ message: 'Sicil numarası boş olamaz.' })
  @MaxLength(50)
  sicil_no: string;

  @IsString({ message: 'İsim string olmalıdır.' })
  @IsNotEmpty({ message: 'İsim boş olamaz.' })
  @MaxLength(150)
  name: string;

  //fk
  @IsInt({ message: 'Departman ID number olmalıdır.' })
  @Min(1)
  @IsNotEmpty({ message: 'Departman ID boş olamaz.' })
  dept_id: number;

  //fk
  @IsInt({ message: 'Rol ID number olmalıdır.' })
  @Min(1)
  @IsNotEmpty({ message: 'Rol ID boş olamaz.' })
  role_id: number;
}
