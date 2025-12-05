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
import { ApiProperty } from '@nestjs/swagger';

@Entity('sinav_detay')
@Unique(['sinav_id', 'soru_id'])
export class SinavDetay {
  @ApiProperty({ example: 1, description: 'Detay ID' })
  @PrimaryGeneratedColumn()
  id: number;

  // Soruya verilen puan (1-4)
  @ApiProperty({ example: 3, description: 'Verilen puan (1-4)' })
  @Column()
  puan: number;

  @ApiProperty({
    example: 'Bazı eksiklikler mevcut fakat gelişmeye açık.',
    description: 'Soruya verilen yorum',
  })
  @Column({ name: 'yorum', length: 1000 })
  yorum: string;

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