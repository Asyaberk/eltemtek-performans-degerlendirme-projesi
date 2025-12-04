import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SinavTuruRepository } from '../repository/sinav-turu.repository';
import { SinavTuru } from '../entities/sinav-turu.entity';
import { CreateSinavTuruDto } from '../dtos/createSinavTuru.dto';
import { UpdateSinavTuruDto } from '../dtos/updateSinavTuru.dto';

@Injectable()
export class SinavTuruService {
  constructor(private readonly sinavTuruRepository: SinavTuruRepository) {}


  async findOne(sinav_turu_id: number): Promise<SinavTuru> {
    const tur = await this.sinavTuruRepository.findById(sinav_turu_id);
    
    if (!tur) {
      throw new NotFoundException(`Sınav Turu (ID: ${sinav_turu_id}) bulunamadı.`);
    }
    return tur;
  }

  async findAll(): Promise<SinavTuru[]> {
    return this.sinavTuruRepository.findAll();
  }
  
  async create(createTurDto: CreateSinavTuruDto): Promise<SinavTuru> {
    const mevcutTur = await this.sinavTuruRepository.findByName(createTurDto.name);
    
    if (mevcutTur) {
      throw new ConflictException(`Sınav Turu adı '${createTurDto.name}' zaten mevcut.`);
    }

    return this.sinavTuruRepository.create(createTurDto);
  }

  async update(sinav_turu_id: number, updateTurDto: UpdateSinavTuruDto): Promise<SinavTuru> {
    const tur = await this.findOne(sinav_turu_id); 
    
    Object.assign(tur, updateTurDto);
    return this.sinavTuruRepository.save(tur);
  }

  async remove(sinav_turu_id: number): Promise<{ message: string }> {
    await this.findOne(sinav_turu_id);
    
    const result = await this.sinavTuruRepository.delete(sinav_turu_id);

    if (result.affected === 0) {
      throw new NotFoundException(`Sınav Turu (ID: ${sinav_turu_id}) bulunamadı.`);
    }
    
    return {
      message: `Sınav Turu (ID: ${sinav_turu_id}) başarıyla silindi.`,
    };
  }
}