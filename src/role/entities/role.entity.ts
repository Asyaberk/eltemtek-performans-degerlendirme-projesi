import { ApiProperty } from '@nestjs/swagger';
import { Personel } from 'src/personel/entities/personel.entity';
import { SoruAgirlik } from 'src/soru-agirlik/entities/soru-agirlik.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('role')
export class Role {
  @ApiProperty({ example: 1, description: 'Rol ID' })
  @PrimaryGeneratedColumn({ name: 'role_id' })
  role_id: number;

  @ApiProperty({ example: 'Müdür', description: 'Rol adı' })
  @Column({ unique: true, length: 50 })
  name: string;

  //Role sahip olan personeller
  @ApiProperty({ type: () => [Personel], required: false })
  @OneToMany(() => Personel, (personel) => personel.role)
  personels: Personel[];

  //Bu Role ait soru ağırlıkları
  @ApiProperty({ type: () => [SoruAgirlik], required: false })
  @OneToMany(() => SoruAgirlik, (agirlik) => agirlik.role)
  soru_agirliklari: SoruAgirlik[];
}
