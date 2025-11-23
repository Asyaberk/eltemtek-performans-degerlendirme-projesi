import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique, 
} from 'typeorm';
import { Sinav } from '../../sinav/entities/sinav.entity';
import { Soru } from 'src/sorular/entities/sorular.entity';

@Entity('sinav_detay')
@Unique(['sinav_id', 'soru_id'])
export class SinavDetay {
  @PrimaryGeneratedColumn()
  id: number;

  // Soruya verilen puan (1-4)
  @Column()
  puan: number;

  // --- SINAV ---
  @ManyToOne(() => Sinav, (sinav) => sinav.detaylar, {
    nullable: false,
    onDelete: 'CASCADE', 
  })
  @JoinColumn({ name: 'sinav_id' })
  sinav: Sinav;
  @Column({ name: 'sinav_id' })
  sinav_id: number; 

  // --- SORULAR ---
  @ManyToOne(() => Soru, (soru) => soru.sinav_detaylari, {
    nullable: false,
  })
  @JoinColumn({ name: 'soru_id' })
  soru: Soru;

  @Column({ name: 'soru_id' })
  soru_id: number;
}