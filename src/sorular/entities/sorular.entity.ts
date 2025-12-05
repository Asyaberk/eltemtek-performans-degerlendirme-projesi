import { ApiProperty } from '@nestjs/swagger';
import { SinavDetay } from 'src/sinav-detay/entities/sinav-detay.entity';
import { SoruAgirlik } from 'src/soru-agirlik/entities/soru-agirlik.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('sorular')
export class Soru {
  @ApiProperty({ example: 1, description: 'Soru ID' })
  @PrimaryGeneratedColumn({ name: 'soru_id' })
  soru_id: number;

  @ApiProperty({
    example: 'Çalışan iş güvenliği kurallarına uyuyor mu?',
    description: 'Soru metni',
  })
  @Column({ name: 'soru', type: 'text' })
  soru_metni: string;

  //Soru Ağırlıkları
  @OneToMany(() => SoruAgirlik, (agirlik) => agirlik.soru)
  agirliklar: SoruAgirlik[];

  // Sınav Detayları
  @OneToMany(() => SinavDetay, (detay) => detay.soru)
  sinav_detaylari: SinavDetay[];
}
