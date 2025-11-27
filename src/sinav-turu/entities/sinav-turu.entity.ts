import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sinav } from '../../sinav/entities/sinav.entity';

@Entity('sinav_turu')
export class SinavTuru {
  @PrimaryGeneratedColumn({ name: 'sinav_turu_id' })
  sinav_turu_id: number;

  // Sınav türünün adı: Senelik, Rotasyon, vb.
  @Column({ unique: true, length: 100 })
  name: string;

  // İlişki: Bu türe ait Sınavlar (One-to-Many)
  @OneToMany(() => Sinav, (sinav) => sinav.sinav_turu)
  sinavlar: Sinav[];
}
