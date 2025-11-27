import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Departman } from '../../departman/entities/departman.entity';
import { Role } from '../../role/entities/role.entity';
import { Sinav } from 'src/sinav/entities/sinav.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('personel')
export class Personel {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '123456' })
  @Index({ unique: true })
  @Column({ name: 'sicil_no', length: 50 })
  sicil_no: string;

  @ApiProperty({ example: 'Melisa Güneş' })
  @Column({ name: 'name', length: 150 })
  name: string; // Adı Soyadı (eski first_last_name)

  // Password, Auth modülünü kurarken eklenebilir ama şimdilik dursun
  // @Exclude()
  // @Column({ nullable: true } )
  // password?: string;

  // --- DEPARTMAN  ---
  @ApiProperty()
  @ManyToOne(() => Departman, (departman) => departman.personels, {
    nullable: false, // Her personelin bir departmanı olmalı
  })
  @JoinColumn({ name: 'dept_id', referencedColumnName: 'dept_id' })
  departman: Departman;
  @Column({ name: 'dept_id' })
  dept_id: number;

  // --- ROLE  ---
  @ApiProperty()
  @ManyToOne(() => Role, (role) => role.personels, {
    nullable: false,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: Role;
  @Column({ name: 'role_id' })
  role_id: number;

  // --- SINAV  ---

  //Değerlendirilen Personel olarak katıldığı sınavlar
  @OneToMany(() => Sinav, (sinav) => sinav.degerlendirilen_personel)
  degerlendirildigi_sinavlar: Sinav[];

  // Değerlendirmeyi yapan Personel olarak katıldığı sınavlar
  @OneToMany(() => Sinav, (sinav) => sinav.sinav_yapan_personel)
  yaptigi_sinavlar: Sinav[];
}
