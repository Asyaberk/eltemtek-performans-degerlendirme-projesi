import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SoruAgirlikRepository } from '../repository/soru-agirlik.repository';
import { SoruAgirlik } from '../entities/soru-agirlik.entity';
import { CreateSoruAgirlikDto } from '../dtos/createSoruAgirlik.dto';
import { UpdateSoruAgirlikDto } from '../dtos/updateSoruAgirlik.dto';

// İlişkili Repository'leri import ediyoruz
import { RoleRepository } from 'src/role/repository/role.repository';
import { SorularRepository } from 'src/sorular/repository/sorular.repository';

@Injectable()
export class SoruAgirlikService {
  constructor(
    private readonly agirlikRepository: SoruAgirlikRepository,
    private readonly rolRepository: RoleRepository,
    private readonly sorularRepository: SorularRepository,
  ) {}

  async findOne(id: number): Promise<SoruAgirlik> {
    const agirlik = await this.agirlikRepository.findById(id);
    
    if (!agirlik) {
      throw new NotFoundException(`Soru Ağırlık kaydı (ID: ${id}) bulunamadı.`);
    }
    return agirlik;
  }
  
  // --- Yardımcı Fonksiyon: İlişki Varlık Kontrolü ---
  private async checkForeignKeys(role_id: number, soru_id: number): Promise<void> {
    // 1. Rol kontrolü
    const rol = await this.rolRepository.findById(role_id);
    if (!rol) {
      throw new NotFoundException(`Rol (ID: ${role_id}) bulunamadı.`);
    }

    // 2. Soru kontrolü
    const soru = await this.sorularRepository.findById(soru_id);
    if (!soru) {
      throw new NotFoundException(`Soru (ID: ${soru_id}) bulunamadı.`);
    }
  }


  async findAll(): Promise<SoruAgirlik[]> {
    return this.agirlikRepository.findAll();
  }
  
  async create(createAgirlikDto: CreateSoruAgirlikDto): Promise<SoruAgirlik> {
    // 1. Yabancı anahtar (FK) kontrolü
    await this.checkForeignKeys(createAgirlikDto.role_id, createAgirlikDto.soru_id);

    // 2. Unique kontrolü (role_id ve soru_id çifti)
    const mevcutAgirlik = await this.agirlikRepository.findByRoleAndSoru(
      createAgirlikDto.role_id, 
      createAgirlikDto.soru_id
    );

    if (mevcutAgirlik) {
      throw new ConflictException(`Bu Rol (ID: ${createAgirlikDto.role_id}) ve Soru (ID: ${createAgirlikDto.soru_id}) çifti için ağırlık zaten tanımlanmıştır.`);
    }

    return this.agirlikRepository.create(createAgirlikDto);
  }

  async update(id: number, updateAgirlikDto: UpdateSoruAgirlikDto): Promise<SoruAgirlik> {
    const agirlik = await this.findOne(id); 
    
    // Yabancı anahtar kontrolü (Sadece DTO'da varsa, çünkü PK'lar değişmemeli)
    if (updateAgirlikDto.role_id || updateAgirlikDto.soru_id) {
        // Şimdilik sadece "agirlik" alanının güncellenmesine izin var
        if (updateAgirlikDto.role_id || updateAgirlikDto.soru_id) {
             throw new ConflictException("Rol ID ve Soru ID alanları bu tabloda güncellenemez.");
        }
    }
    
    // Sadece ağırlık değerini güncelliyoruz
    Object.assign(agirlik, updateAgirlikDto);

    return this.agirlikRepository.save(agirlik);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    
    const result = await this.agirlikRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Soru Ağırlık kaydı (ID: ${id}) bulunamadı.`);
    }
    
    return {
      message: `Soru Ağırlık kaydı (ID: ${id}) başarıyla silindi.`,
    };
  }
}