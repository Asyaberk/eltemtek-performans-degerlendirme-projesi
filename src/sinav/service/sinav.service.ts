import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SinavRepository } from '../repository/sinav.repository';
import { Sinav } from '../entities/sinav.entity';
import { CreateSinavDto } from '../dtos/createSinav.dto';
import { UpdateSinavDto } from '../dtos/updateSinav.dto';

// İlişkili Repository'leri import ediyoruz
import { PersonelRepository } from 'src/personel/repository/personel.repository';
import { SinavTuruRepository } from 'src/sinav-turu/repository/sinav-turu.repository';

@Injectable()
export class SinavService {
  constructor(
    private readonly sinavRepository: SinavRepository,
    private readonly personelRepository: PersonelRepository,
    private readonly sinavTuruRepository: SinavTuruRepository,
  ) {}

  async findOne(sinav_id: number, loadDetails: boolean = false): Promise<Sinav> {
    const sinav = await this.sinavRepository.findById(sinav_id, loadDetails);
    
    if (!sinav) {
      throw new NotFoundException(`Sınav (ID: ${sinav_id}) bulunamadı.`);
    }
    return sinav;
  }
  
  // --- Yardımcı Fonksiyon: İlişki Varlık Kontrolü ---
  private async checkForeignKeys(olan_id: number, yapan_id: number, tur_id: number): Promise<void> {
    // 1. Personel kontrolü
    if (olan_id === yapan_id) {
        throw new BadRequestException("Değerlendiren personel, değerlendirilen personelin kendisi olamaz.");
    }

    const olanPersonel = await this.personelRepository.findById(olan_id);
    if (!olanPersonel) {
      throw new NotFoundException(`Değerlendirilen Personel (ID: ${olan_id}) bulunamadı.`);
    }

    const yapanPersonel = await this.personelRepository.findById(yapan_id);
    if (!yapanPersonel) {
      throw new NotFoundException(`Değerlendiren Personel (ID: ${yapan_id}) bulunamadı.`);
    }
    
    // 2. Sınav Türü kontrolü
    const sinavTuru = await this.sinavTuruRepository.findById(tur_id);
    if (!sinavTuru) {
      throw new NotFoundException(`Sınav Türü (ID: ${tur_id}) bulunamadı.`);
    }
  }

  async findAll(): Promise<Sinav[]> {
    return this.sinavRepository.findAll();
  }
  
  async create(createSinavDto: CreateSinavDto): Promise<Sinav> {
    await this.checkForeignKeys(
      createSinavDto.sinav_olan_personel_id, 
      createSinavDto.sinav_yapan_personel_id, 
      createSinavDto.sinav_turu_id
    );

    return this.sinavRepository.create(createSinavDto);
  }

  async update(sinav_id: number, updateSinavDto: UpdateSinavDto): Promise<Sinav> {
    const sinav = await this.findOne(sinav_id); 
    
    // Yabancı anahtar kontrolü (Eğer güncellenmeye çalışılıyorsa)
    if (updateSinavDto.sinav_olan_personel_id || updateSinavDto.sinav_yapan_personel_id || updateSinavDto.sinav_turu_id) {
        await this.checkForeignKeys(
            updateSinavDto.sinav_olan_personel_id || sinav.sinav_olan_personel_id,
            updateSinavDto.sinav_yapan_personel_id || sinav.yapan_personel_id,
            updateSinavDto.sinav_turu_id || sinav.sinav_turu_id
        );
    }
    Object.assign(sinav, updateSinavDto);

    return this.sinavRepository.save(sinav);
  }

  async remove(sinav_id: number): Promise<{ message: string }> {
    await this.findOne(sinav_id);
    
    const result = await this.sinavRepository.delete(sinav_id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Sınav (ID: ${sinav_id}) bulunamadı.`);
    }
    
    return {
      message: `Sınav (ID: ${sinav_id}) başarıyla silindi.`,
    };
  }
}