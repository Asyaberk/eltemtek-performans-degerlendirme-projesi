import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Sinav } from '../entities/sinav.entity';

@Injectable()
export class SinavRepository {
  constructor(
    @InjectRepository(Sinav)
    private readonly sinavRepo: Repository<Sinav>,
  ) {}

  // İlişkili veri listesi
  private readonly relations = [
    'degerlendirilen_personel',
    'sinav_yapan_personel',
    'sinav_turu',
  ];

  async findAll(): Promise<Sinav[]> {
    return this.sinavRepo.find({
      relations: this.relations,
    });
  }

  async findById(
    sinav_id: number,
    loadDetails: boolean = false,
  ): Promise<Sinav | null> {
    const relationsToLoad = [...this.relations];
    if (loadDetails) {
      relationsToLoad.push('detaylar');
    }
    return this.sinavRepo.findOne({
      where: { sinav_id },
      relations: relationsToLoad,
    });
  }

  async create(sinavData: Partial<Sinav>): Promise<Sinav> {
    const yeniSinav = this.sinavRepo.create(sinavData);
    return this.sinavRepo.save(yeniSinav);
  }

  async save(sinav: Sinav): Promise<Sinav> {
    return this.sinavRepo.save(sinav);
  }

  async delete(sinav_id: number): Promise<DeleteResult> {
    return this.sinavRepo.delete(sinav_id);
  }
}
