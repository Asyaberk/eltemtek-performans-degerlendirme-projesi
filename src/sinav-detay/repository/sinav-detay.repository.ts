import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { SinavDetay } from '../entities/sinav-detay.entity';

@Injectable()
export class SinavDetayRepository {
  constructor(
    @InjectRepository(SinavDetay)
    private readonly detayRepo: Repository<SinavDetay>,
  ) {}

  async findAll(): Promise<SinavDetay[]> {
    return this.detayRepo.find({
      relations: ['sinav', 'soru'], // İlişkili verileri yüklüyoruz
    });
  }

  async findById(id: number): Promise<SinavDetay | null> {
    return this.detayRepo.findOne({
      where: { id },
      relations: ['sinav', 'soru'],
    });
  }

  async findBySinavAndSoru(
    sinav_id: number,
    soru_id: number,
  ): Promise<SinavDetay | null> {
    return this.detayRepo.findOne({
      where: { sinav_id, soru_id },
      relations: ['sinav', 'soru'],
    });
  }

  async findBySinavId(sinav_id: number): Promise<SinavDetay[]> {
    return this.detayRepo.find({
      where: { sinav_id },
      relations: ['soru'], // Detayları çekerken ilgili soruları getirebiliriz
    });
  }

  async create(detayData: Partial<SinavDetay>): Promise<SinavDetay> {
    const yeniDetay = this.detayRepo.create(detayData);
    return this.detayRepo.save(yeniDetay);
  }

  async save(detay: SinavDetay): Promise<SinavDetay> {
    return this.detayRepo.save(detay);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.detayRepo.delete(id);
  }
}
