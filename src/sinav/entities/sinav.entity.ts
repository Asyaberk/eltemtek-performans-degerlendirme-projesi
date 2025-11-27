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
import { SinavTuru } from 'src/sinav-turu/entities/sinav-turu.entity';

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

  @Column({ name: 'zorunlu_egitim' })
  zorunlu_egitim: boolean;

  @Column({ name: 'zorunlu_egitim_aciklama', length: 500 })
  zorunlu_egitim_aciklama: string;

  @Column({ name: 'planlama', length: 1000 })
  planlama: string;

  @Column({ name: 'hedefler', length: 1000 })
  hedefler: string;

  @Column({ name: 'diger', length: 1000 })
  diger: string;

  @Column({ name: 'calisan_yorum', length: 1000 })
  calisan_yorum: string;

  // İlişki: Sınav Detayları (SINAV_DETAY tablosuna bağlı)
  @OneToMany(() => SinavDetay, (detay) => detay.sinav)
  detaylar: SinavDetay[];

  // --- İlişki: SINAV TURU ---
  @ManyToOne(() => SinavTuru, (sinavTuru) => sinavTuru.sinavlar, {
    nullable: false, // Her sınavın bir türü olmalı
  })
  @JoinColumn({ name: 'sinav_turu_id' })
  sinav_turu: SinavTuru;

  @Column({ name: 'sinav_turu_id' })
  sinav_turu_id: number;
}
