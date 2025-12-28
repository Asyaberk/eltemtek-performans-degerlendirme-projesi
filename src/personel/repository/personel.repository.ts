import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Personel } from '../entities/personel.entity';

@Injectable()
export class PersonelRepository {
  constructor(
    @InjectRepository(Personel)
    private readonly personelRepo: Repository<Personel>,
  ) {}

  async findAll(): Promise<Personel[]> {
    return this.personelRepo.find({
      relations: ['departman', 'role'],
    });
  }

  async findBySicilNo(sicil_no: string): Promise<Personel | null> {
    return this.personelRepo.findOne({
      where: { sicil_no },
      relations: ['departman', 'role'],
    });
  }

  async create(personelData: Partial<Personel>): Promise<Personel> {
    const yeniPersonel = this.personelRepo.create(personelData);
    return this.personelRepo.save(yeniPersonel);
  }

  async update(personel: Personel): Promise<Personel> {
    return this.personelRepo.save(personel);
  }

  async delete(sicil_no: string): Promise<DeleteResult> {
    return this.personelRepo.delete({ sicil_no });
  }
}
