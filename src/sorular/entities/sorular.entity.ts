import { SinavDetay } from 'src/sinav-detay/entities/sinav-detay.entity';
import { SoruAgirlik } from 'src/soru-agirlik/entities/soru-agirlik.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('sorular')
export class Soru {
  @PrimaryGeneratedColumn({ name: 'soru_id' })
  soru_id: number;

  @Column({ name: 'soru', type: 'text' })
  soru_metni: string; 

  //Soru Ağırlıkları
  @OneToMany(() => SoruAgirlik, (agirlik) => agirlik.soru)
  agirliklar: SoruAgirlik[];

  // Sınav Detayları 
  @OneToMany(() => SinavDetay, (detay) => detay.soru)
  sinav_detaylari: SinavDetay[];
}
