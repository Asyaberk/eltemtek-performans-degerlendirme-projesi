import { ApiProperty } from '@nestjs/swagger';
import { Personel } from 'src/personel/entities/personel.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('departman')
export class Departman {
  @ApiProperty({
    description: 'Departman ID',
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'dept_id' })
  dept_id: number;

  @ApiProperty({
    description: 'Departman adı',
    example: 'Müdürlük',
  })
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty({
    description: 'Departmandaki personeller',
    type: () => [Personel],
    required: false,
  })
  //Departmanın sahip olduğu personeller
  @OneToMany(() => Personel, (personel) => personel.departman)
  personels: Personel[];
}
