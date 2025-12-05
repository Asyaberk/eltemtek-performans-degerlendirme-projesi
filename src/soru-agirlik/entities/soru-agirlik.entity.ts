import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique, 
} from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Soru } from 'src/sorular/entities/sorular.entity';
import { ApiProperty } from '@nestjs/swagger';

// Bir Role ait aynı Sorunun birden fazla ağırlığı olamaz
@Entity('soru_agirlik')
@Unique(['role_id', 'soru_id'])
export class SoruAgirlik {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 4 })
  @ApiProperty({
    example: 0.5,
    description: 'Soru ağırlığı değeri',
  })
  // Ağırlık değeri (weight) (0-2)
  agirlik: number;

  // --- ROLE  ---
  @ManyToOne(() => Role, (role) => role.soru_agirliklari, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: Role;
  @Column({ name: 'role_id' })
  role_id: number;

  // --- SORULAR ---
  @ManyToOne(() => Soru, (soru) => soru.agirliklar, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'soru_id', referencedColumnName: 'soru_id' })
  soru: Soru;
  @Column({ name: 'soru_id' })
  soru_id: number;
}
