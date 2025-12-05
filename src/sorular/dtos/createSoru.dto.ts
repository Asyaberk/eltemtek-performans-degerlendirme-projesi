import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSoruDto {

  @IsString({ message: 'Soru string olmalıdır.' })
  @IsNotEmpty({ message: 'Soru metni boş olamaz.' })
  soru_metni: string; 
}
