import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SinavRepository } from '../repository/sinav.repository';
import { Sinav } from '../entities/sinav.entity';
import { CreateSinavDto } from '../dtos/createSinav.dto';
import { UpdateSinavDto } from '../dtos/updateSinav.dto';

// İlişkili Repository'leri import ediyoruz
import { PersonelRepository } from 'src/personel/repository/personel.repository';
import { SinavTuruRepository } from 'src/sinav-turu/repository/sinav-turu.repository';
import { SoruAgirlikRepository } from 'src/soru-agirlik/repository/soru-agirlik.repository';
import { SinavDetayRepository } from 'src/sinav-detay/repository/sinav-detay.repository';

@Injectable()
export class SinavService {
  constructor(
    private readonly sinavRepository: SinavRepository,
    private readonly personelRepository: PersonelRepository,
    private readonly sinavTuruRepository: SinavTuruRepository,
    //puan hesaplaması için
    private readonly agirlikRepository: SoruAgirlikRepository,
    private readonly detayRepository: SinavDetayRepository,
  ) {}

  async findOne(
    sinav_id: number,
    loadDetails: boolean = false,
  ): Promise<Sinav> {
    const sinav = await this.sinavRepository.findById(sinav_id, loadDetails);

    if (!sinav) {
      throw new NotFoundException(`Sınav (ID: ${sinav_id}) bulunamadı.`);
    }
    return sinav;
  }

  // --- Yardımcı Fonksiyon: İlişki Varlık Kontrolü ---
  private async checkForeignKeys(
    olan_id: string,
    yapan_id: string,
    tur_id: number,
  ): Promise<void> {
    // 1. Personel kontrolü
    if (olan_id === yapan_id) {
      throw new BadRequestException(
        'Değerlendiren personel, değerlendirilen personelin kendisi olamaz.',
      );
    }

    const olanPersonel = await this.personelRepository.findBySicilNo(olan_id);
    if (!olanPersonel) {
      throw new NotFoundException(
        `Değerlendirilen Personel (ID: ${olan_id}) bulunamadı.`,
      );
    }

    const yapanPersonel = await this.personelRepository.findBySicilNo(yapan_id);
    if (!yapanPersonel) {
      throw new NotFoundException(
        `Değerlendiren Personel (ID: ${yapan_id}) bulunamadı.`,
      );
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
      createSinavDto.sinav_turu_id,
    );

    return this.sinavRepository.create(createSinavDto);
  }

  async update(
    sinav_id: number,
    updateSinavDto: UpdateSinavDto,
  ): Promise<Sinav> {
    const sinav = await this.findOne(sinav_id);

    // Yabancı anahtar kontrolü (Eğer güncellenmeye çalışılıyorsa)
    if (
      updateSinavDto.sinav_olan_personel_id ||
      updateSinavDto.sinav_yapan_personel_id ||
      updateSinavDto.sinav_turu_id
    ) {
      await this.checkForeignKeys(
        updateSinavDto.sinav_olan_personel_id || sinav.sinav_olan_personel_id,
        updateSinavDto.sinav_yapan_personel_id || sinav.sinav_yapan_personel_id,
        updateSinavDto.sinav_turu_id || sinav.sinav_turu_id,
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
///////////////////////
  //ana işlevimiz olan hespalama metodu
  //(Ağırlık x Puan toplamı) hesaplyacak
  async calculatePerformanceScore(sinav_id: number): Promise<number> {
    // 1. Sınav kaydını ve değerlendirilen personeli al
    const sinav = await this.sinavRepository.findById(sinav_id, false);
    if (!sinav) {
      throw new NotFoundException(`Sınav (ID: ${sinav_id}) bulunamadı.`);
    }
    const degerlendirilenPersonel = await this.personelRepository.findBySicilNo(
      sinav.sinav_olan_personel_id,
    );

    //role IDsine bakıcaz
    if (!degerlendirilenPersonel?.role_id) {
      throw new BadRequestException(
        'Değerlendirilen personelin Rol bilgisi bulunamadı.',
      );
    }
    const personelRolId = degerlendirilenPersonel.role_id;

    // 2. Sınavın tüm detaylarını al mesela hangi soruya kaç puan verildi vs
    const detaylar = await this.detayRepository.findBySinavId(sinav_id);
    // Cevap yoksa puan 0
    if (detaylar.length === 0) {
      return 0;
    }

    let toplamPuan = 0;

    // 3. Her bir detay kaydını döngüye al
    for (const detay of detaylar) {
      // 4. İlgili soru için Role bazlı ağırlığı bul
      const agirlikKaydi = await this.agirlikRepository.findByRoleAndSoru(
        personelRolId,
        detay.soru_id,
      );

      // Eğer bu Role ve Soru çifti için ağırlık tanımlanmamışsa, ağırlığı 1 olarak kabul ettim hata çıkmasın
      const agirlik = agirlikKaydi ? agirlikKaydi.agirlik : 1;

      // 5. Hesaplama: (Puan * Ağırlık)
      const skor = detay.puan * agirlik;
      toplamPuan += skor;
    }

    // 6. Sonucu döndür
    return Number.parseFloat(toplamPuan.toFixed(2)); // İki ondalık basamağa yuvarlayalım
  }
}