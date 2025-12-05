// src/sorular/repositories/sorular.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Soru } from '../entities/sorular.entity';

@Injectable()
export class SorularRepository {
  constructor(
    @InjectRepository(Soru)
    private readonly soruRepo: Repository<Soru>,
  ) {}

  /**
   * Tüm soruları getirir.
   */
  async findAll(): Promise<Soru[]> {
    return this.soruRepo.find();
  }

  async findById(soru_id: number): Promise<Soru | null> {
    return this.soruRepo.findOneBy({ soru_id });
  }


  async create(soruData: Partial<Soru>): Promise<Soru> {
    const yeniSoru = this.soruRepo.create(soruData);
    return this.soruRepo.save(yeniSoru);
  }


  async save(soru: Soru): Promise<Soru> {
    return this.soruRepo.save(soru);
  }

  async delete(soru_id: number): Promise<DeleteResult> {
    // Soru silindiğinde, ilişkili Soru Ağırlıkları ve Sınav Detayları da CASCADE kuralı ile silinmelidir.
    return this.soruRepo.delete(soru_id);
  }
}