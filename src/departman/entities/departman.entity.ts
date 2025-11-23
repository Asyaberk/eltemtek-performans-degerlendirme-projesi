import { Personel } from 'src/personel/entities/personel.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('departman')
export class Departman {
  @PrimaryGeneratedColumn({ name: 'dept_id' })
  dept_id: number;

  @Column({ unique: true, length: 100 })
  name: string;

  //Departmanın sahip olduğu personeller
  @OneToMany(() => Personel, (personel) => personel.departman)
  personels: Personel[];
}
