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
import { ApiProperty } from '@nestjs/swagger';

@Entity('sinav')
export class Sinav {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'sinav_id' })
  sinav_id: number;

  // Sınavın yapıldığı tarih
  @ApiProperty({ example: '2025-01-12' })
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
  sinav_olan_personel_id: string;

  // --- Değerlendirmeyi Yapan Personel  ---
  @ManyToOne(() => Personel, (personel) => personel.yaptigi_sinavlar, {
    nullable: false,
  })
  @JoinColumn({ name: 'sinav_yapan_personel_id' })
  sinav_yapan_personel: Personel;
  @Column({ name: 'sinav_yapan_personel_id' })
  yapan_personel_id: string;

  
  @ApiProperty({ example: false })
  @Column({ name: 'zorunlu_egitim' })
  zorunlu_egitim: boolean;

  @ApiProperty({ example: 'Herhangi bir zorunlu eğitim gerekmiyor.' })
  @Column({ name: 'zorunlu_egitim_aciklama', length: 500 })
  zorunlu_egitim_aciklama: string;

  @ApiProperty({ example: 'Planlama yetkinligi yeterli' })
  @Column({ name: 'planlama', length: 1000 })
  planlama: string;

  @ApiProperty({ example: 'Hedefler başarıyla tamamlandı' })
  @Column({ name: 'hedefler', length: 1000 })
  hedefler: string;

  @ApiProperty({ example: 'Diğer bilgiler...' })
  @Column({ name: 'diger', length: 1000 })
  diger: string;

  @ApiProperty({ example: 'Çalışan kendi performansını yeterli görüyor.' })
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
