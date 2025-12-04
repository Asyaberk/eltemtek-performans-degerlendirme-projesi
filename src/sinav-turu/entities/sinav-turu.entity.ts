import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sinav } from '../../sinav/entities/sinav.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sinav_turu')
export class SinavTuru {
  @ApiProperty({
    example: 1,
    description: 'Sınav türü ID',
  })
  @PrimaryGeneratedColumn({ name: 'sinav_turu_id' })
  sinav_turu_id: number;

  // Sınav türünün adı: Senelik, Rotasyon, vb.
  @ApiProperty({
    example: 'Yıllık Performans Değerlendirmesi',
    description: 'Sınav türünün adı',
  })
  @Column({ unique: true, length: 100 })
  name: string;

  // İlişki: Bu türe ait Sınavlar (One-to-Many)
  @ApiProperty({
    example: 'Her yıl yapılan standart performans değerlendirme sınavı',
    description: 'Sınav türüne ait açıklama',
    required: false,
  })
  @OneToMany(() => Sinav, (sinav) => sinav.sinav_turu)
  sinavlar: Sinav[];
}
