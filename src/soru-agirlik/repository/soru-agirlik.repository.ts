import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { SoruAgirlik } from '../entities/soru-agirlik.entity';

@Injectable()
export class SoruAgirlikRepository {
  constructor(
    @InjectRepository(SoruAgirlik)
    private readonly agirlikRepo: Repository<SoruAgirlik>,
  ) {}

  async findAll(): Promise<SoruAgirlik[]> {
    return this.agirlikRepo.find({
      relations: ['role', 'soru'], 
    });
  }

  async findById(id: number): Promise<SoruAgirlik | null> {
    return this.agirlikRepo.findOne({
      where: { id },
      relations: ['role', 'soru'],
    });
  }

  async findByRoleAndSoru(
    role_id: number,
    soru_id: number,
  ): Promise<SoruAgirlik | null> {
    return this.agirlikRepo.findOne({
      where: { role_id, soru_id },
      relations: ['role', 'soru'],
    });
  }

  async create(agirlikData: Partial<SoruAgirlik>): Promise<SoruAgirlik> {
    const yeniAgirlik = this.agirlikRepo.create(agirlikData);
    return this.agirlikRepo.save(yeniAgirlik);
  }

  async save(agirlik: SoruAgirlik): Promise<SoruAgirlik> {
    return this.agirlikRepo.save(agirlik);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.agirlikRepo.delete(id);
  }
}
