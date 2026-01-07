import { IsNotEmpty, IsInt, Min, IsBoolean, IsString, MaxLength, IsDateString, IsOptional } from 'class-validator';

export class CreateSinavDto {
  @IsDateString(
    {},
    { message: 'Tarih geçerli bir tarih formatında olmalıdır.' },
  )
  @IsNotEmpty({ message: 'Tarih boş bırakılamaz.' })
  tarih: Date;

  // --- FK'lar ---
  //Değerlendirilen Personel ID'si
  @IsString({ message: 'Değerlendirilen ID string olmalıdır.' })
  @IsNotEmpty({ message: 'Değerlendirilen personel ID boş olamaz.' })
  sinav_olan_personel_id: string;

  //Değerlendirmeyi Yapan Personel ID'si
  @IsString({ message: 'Yapan ID string olmalıdır.' })
  @IsNotEmpty({ message: 'Yapan personel ID boş olamaz.' })
  sinav_yapan_personel_id: string;

  //Sınav Türü ID'si
  @IsInt({ message: 'Sınav Türü ID int olmalıdır.' })
  @Min(1)
  @IsNotEmpty({ message: 'Sınav Türü ID boş olamaz.' })
  sinav_turu_id: number;

  // --- Diğer Alanlar ---
  @IsBoolean({ message: 'Zorunlu eğitim alanı boolean olmalıdır.' })
  @IsNotEmpty({ message: 'Zorunlu eğitim alanı boş olamaz.' })
  zorunlu_egitim: boolean;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  zorunlu_egitim_aciklama?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  planlama?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  hedefler?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  diger?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  calisan_yorum?: string;
}