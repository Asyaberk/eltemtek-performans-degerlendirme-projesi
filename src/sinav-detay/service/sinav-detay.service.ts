import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SinavDetayRepository } from '../repository/sinav-detay.repository';
import { SinavDetay } from '../entities/sinav-detay.entity';
import { CreateSinavDetayDto } from '../dtos/createSinavDetay.dto';
import { UpdateSinavDetayDto } from '../dtos/updateSinavDetay.dto';

// İlişkili Repository'leri import ediyoruz
import { SorularRepository } from 'src/sorular/repository/sorular.repository';
import { SinavRepository } from 'src/sinav/repository/sinav.repository';

@Injectable()
export class SinavDetayService {
  constructor(
    private readonly detayRepository: SinavDetayRepository,
    private readonly sorularRepository: SorularRepository, 
    private readonly sinavRepository: SinavRepository, 
  ) {}

  async findOne(id: number): Promise<SinavDetay> {
    const detay = await this.detayRepository.findById(id);
    
    if (!detay) {
      throw new NotFoundException(`Sınav Detay kaydı (ID: ${id}) bulunamadı.`);
    }
    return detay;
  }
  
  // --- Yardımcı Fonksiyon: İlişki Varlık Kontrolü ---
  private async checkForeignKeys(sinav_id: number, soru_id: number): Promise<void> {
    // 1. Sınav kontrolü
    const sinav = await this.sinavRepository.findById(sinav_id);
    if (!sinav) {
      throw new NotFoundException(`Sınav (ID: ${sinav_id}) bulunamadı.`);
    }

    // 2. Soru kontrolü
    const soru = await this.sorularRepository.findById(soru_id);
    if (!soru) {
      throw new NotFoundException(`Soru (ID: ${soru_id}) bulunamadı.`);
    }
  }

  async findAll(): Promise<SinavDetay[]> {
    return this.detayRepository.findAll();
  }
  
  async create(createDetayDto: CreateSinavDetayDto): Promise<SinavDetay> {
    // 1. Yabancı anahtar (FK) kontrolü
    await this.checkForeignKeys(createDetayDto.sinav_id, createDetayDto.soru_id);

    // 2. Benzersizlik kontrolü (sinav_id ve soru_id çifti)
    const mevcutDetay = await this.detayRepository.findBySinavAndSoru(
      createDetayDto.sinav_id, 
      createDetayDto.soru_id
    );

    if (mevcutDetay) {
      throw new ConflictException(`Bu Sınav (ID: ${createDetayDto.sinav_id}) ve Soru (ID: ${createDetayDto.soru_id}) çifti için puan zaten tanımlanmıştır.`);
    }

    return this.detayRepository.create(createDetayDto);
  }

  async update(id: number, updateDetayDto: UpdateSinavDetayDto): Promise<SinavDetay> {
    const detay = await this.findOne(id); 
    
    // Yabancı anahtar kontrolü 
    if (updateDetayDto.sinav_id || updateDetayDto.soru_id) {
        throw new ConflictException("Sınav ID ve Soru ID alanları bu tabloda güncellenemez.");
    }
    Object.assign(detay, updateDetayDto);

    return this.detayRepository.save(detay);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    
    const result = await this.detayRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Sınav Detay kaydı (ID: ${id}) bulunamadı.`);
    }
    
    return {
      message: `Sınav Detay kaydı (ID: ${id}) başarıyla silindi.`,
    };
  }
}