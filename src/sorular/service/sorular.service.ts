import { Injectable, NotFoundException } from '@nestjs/common';
import { SorularRepository } from '../repository/sorular.repository';
import { Soru } from '../entities/sorular.entity';
import { CreateSoruDto } from '../dtos/createSoru.dto';
import { UpdateSoruDto } from '../dtos/updateSoru.dto';

@Injectable()
export class SorularService {
  constructor(private readonly sorularRepository: SorularRepository) {}

  async findOne(soru_id: number): Promise<Soru> {
    const soru = await this.sorularRepository.findById(soru_id);

    if (!soru) {
      throw new NotFoundException(`Soru (ID: ${soru_id}) bulunamadı.`);
    }
    return soru;
  }


  async findAll(): Promise<Soru[]> {
    return this.sorularRepository.findAll();
  }

  async create(createSoruDto: CreateSoruDto): Promise<Soru> {
    // DTO'yu doğrudan Entity'ye dönüştürüp kaydetme
    return this.sorularRepository.create(createSoruDto);
  }

  async update(soru_id: number, updateSoruDto: UpdateSoruDto): Promise<Soru> {
    const soru = await this.findOne(soru_id);
    Object.assign(soru, updateSoruDto);
    return this.sorularRepository.save(soru);
  }

  async remove(soru_id: number): Promise<{ message: string }> {
    await this.findOne(soru_id);
    const result = await this.sorularRepository.delete(soru_id);

    if (result.affected === 0) {
      throw new NotFoundException(`Soru (ID: ${soru_id}) bulunamadı.`);
    }

    return {
      message: `Soru (ID: ${soru_id}) başarıyla silindi.`,
    };
  }
}
