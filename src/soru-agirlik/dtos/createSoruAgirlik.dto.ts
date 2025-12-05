import { IsNotEmpty, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CreateSoruAgirlikDto {
    //Rol ID'si (Foreign Key)
    @IsInt({ message: 'Rol ID int olmalıdır.' })
    @Min(1)
    @IsNotEmpty({ message: 'Rol ID boş olamaz.' })
    role_id: number;

    //Soru ID'si
    @IsInt({ message: 'Soru ID int olmalıdır.' })
    @Min(1)
    @IsNotEmpty({ message: 'Soru ID boş olamaz.' })
    soru_id: number;

    //Ağırlık değeri (0 ile 2 arası bir decimal değer)
    @IsNumber({}, { message: 'Ağırlık değeri number olmalıdır.' })
    @IsNotEmpty({ message: 'Ağırlık değeri boş olamaz.' })
    @Min(0, { message: "Ağırlık değeri 0'dan küçük olamaz." })
    @Max(2, { message: "Ağırlık değeri 2'den büyük olamaz." })
    agirlik: number;
}
