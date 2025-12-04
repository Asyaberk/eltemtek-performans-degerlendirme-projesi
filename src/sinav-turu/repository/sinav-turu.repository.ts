import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { SinavTuru } from '../entities/sinav-turu.entity';

@Injectable()
export class SinavTuruRepository {
  constructor(
    @InjectRepository(SinavTuru)
    private readonly sinavTuruRepo: Repository<SinavTuru>,
  ) {}

  async findAll(): Promise<SinavTuru[]> {
    return this.sinavTuruRepo.find();
  }

  async findByName(name: string): Promise<SinavTuru | null> {
    return this.sinavTuruRepo.findOne({ where: { name } });
  }

  async findById(sinav_turu_id: number): Promise<SinavTuru | null> {
    return this.sinavTuruRepo.findOneBy({ sinav_turu_id });
  }

  async create(turData: Partial<SinavTuru>): Promise<SinavTuru> {
    const yeniTur = this.sinavTuruRepo.create(turData);
    return this.sinavTuruRepo.save(yeniTur);
  }

  async save(sinavTuru: SinavTuru): Promise<SinavTuru> {
    return this.sinavTuruRepo.save(sinavTuru);
  }

  async delete(sinav_turu_id: number): Promise<DeleteResult> {
    return this.sinavTuruRepo.delete(sinav_turu_id);
  }
}
