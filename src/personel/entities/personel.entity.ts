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

@Entity('personel')
export class Personel {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ name: 'sicil_no', length: 50 })
  sicil_no: string;

  @Column({ name: 'name', length: 150 })
  name: string; // Adı Soyadı (eski first_last_name)


  // Password, Auth modülünü kurarken eklenebilir ama şimdilik dursun
  // @Exclude()
  // @Column({ nullable: true } )
  // password?: string;

  // --- DEPARTMAN  ---
  @ManyToOne(() => Departman, (departman) => departman.personels, {
    nullable: false, // Her personelin bir departmanı olmalı
  })
  @JoinColumn({ name: 'dept_id', referencedColumnName: 'dept_id' })
  departman: Departman;
  @Column({ name: 'dept_id' })
  dept_id: number;

  // --- ROLE  ---
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
