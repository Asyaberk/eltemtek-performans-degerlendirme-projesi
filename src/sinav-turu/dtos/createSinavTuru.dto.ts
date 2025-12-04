import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSinavTuruDto {

    //Sınav türünün adı mesela: Senelik, Rotasyon
    @IsString({ message: 'Sınav türü adı string olmalıdır.' })
    @IsNotEmpty({ message: 'Sınav türü adı boş olamaz.' })
    @MaxLength(100, { message: 'Sınav türü adı en fazla 100 karakter olabilir.' })
    name: string;
}