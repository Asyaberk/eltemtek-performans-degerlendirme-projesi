import { IsNotEmpty, IsInt, Min, Max, IsString, MaxLength } from 'class-validator';

export class CreateSinavDetayDto {
  //Sınav ID'si
  @IsInt({ message: 'Sınav ID int olmalıdır.' })
  @Min(1)
  @IsNotEmpty({ message: 'Sınav ID boş olamaz.' })
  sinav_id: number;

  //Soru ID'si
  @IsInt({ message: 'Soru ID int olmalıdır.' })
  @Min(1)
  @IsNotEmpty({ message: 'Soru ID boş olamaz.' })
  soru_id: number;

  //Soruya verilen puan (1 ile 4 arası).
  @IsInt({ message: 'Puan int olmalıdır.' })
  @IsNotEmpty({ message: 'Puan boş olamaz.' })
  @Min(1, { message: "Puan 1'den küçük olamaz." })
  @Max(4, { message: "Puan 4'ten büyük olamaz." })
  puan: number;

  //Değerlendiricinin yorumu.
  @IsString({ message: 'Yorum string olmalıdır.' })
  @MaxLength(1000, { message: 'Yorum en fazla 1000 karakter olabilir.' })
  @IsNotEmpty({ message: 'Yorum boş olamaz.' })
  yorum: string;
}