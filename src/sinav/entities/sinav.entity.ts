import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Personel } from '../../personel/entities/personel.entity';
import { SinavDetay } from 'src/sinav-detay/entities/sinav-detay.entity';

@Entity('sinav')
export class Sinav {
  @PrimaryGeneratedColumn({ name: 'sinav_id' })
  sinav_id: number;

  // Sınavın yapıldığı tarih
  @Column({ type: 'date' })
  tarih: Date;

  // ---  Değerlendirilen Personel  ---
  @ManyToOne(
    () => Personel,
    (personel) => personel.degerlendirildigi_sinavlar,
    { nullable: false },
  )
  @JoinColumn({ name: 'sinav_olan_personel_id' })
  degerlendirilen_personel: Personel;

  @Column({ name: 'sinav_olan_personel_id' })
  sinav_olan_personel_id: number;

  // --- Değerlendirmeyi Yapan Personel  ---
  @ManyToOne(() => Personel, (personel) => personel.yaptigi_sinavlar, {
    nullable: false,
  })
  @JoinColumn({ name: 'sinav_yapan_personel_id' }) 
  sinav_yapan_personel: Personel;

  @Column({ name: 'sinav_yapan_personel_id' })
  yapan_personel_id: number;

  // İlişki: Sınav Detayları (SINAV_DETAY tablosuna bağlı)
  @OneToMany(() => SinavDetay, (detay) => detay.sinav)
  detaylar: SinavDetay[];
}
