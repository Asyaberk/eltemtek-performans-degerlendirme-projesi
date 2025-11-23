import { Personel } from 'src/personel/entities/personel.entity';
import { SoruAgirlik } from 'src/soru-agirlik/entities/soru-agirlik.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  role_id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  //Role sahip olan personeller 
  @OneToMany(() => Personel, (personel) => personel.role)
  personels: Personel[];

  //Bu Role ait soru ağırlıkları 
  @OneToMany(() => SoruAgirlik, (agirlik) => agirlik.role)
  soru_agirliklari: SoruAgirlik[];
}
