import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpCode, Query, Put } from '@nestjs/common';
import { SinavService } from '../service/sinav.service';
import { Sinav } from '../entities/sinav.entity';
import { CreateSinavDto } from '../dtos/createSinav.dto';
import { UpdateSinavDto } from '../dtos/updateSinav.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sınav')
@Controller('sinav')
export class SinavController {
  constructor(private readonly sinavService: SinavService) {}

  // POST /sinav
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Yeni bir sınav oluştur',
    description:
      'Bir çalışanın performans değerlendirme sınavını oluşturur. Sınav türü, değerlendiren personel, değerlendirilen personel gibi bilgiler zorunludur.',
  })
  @ApiBody({
    description: 'Oluşturulacak sınav bilgileri',
    schema: {
      type: 'object',
      properties: {
        tarih: {
          type: 'string',
          example: '2025-01-12',
          description: 'Sınavın yapıldığı tarih',
        },
        sinav_olan_personel_id: {
          type: 'number',
          example: 12,
          description: 'Değerlendirilen personel ID',
        },
        sinav_yapan_personel_id: {
          type: 'number',
          example: 5,
          description: 'Değerlendirmeyi yapan personel ID',
        },
        zorunlu_egitim: {
          type: 'boolean',
          example: false,
          description: 'Zorunlu eğitim gerekiyorsa true',
        },
        zorunlu_egitim_aciklama: {
          type: 'string',
          example: 'Eğitim gerekmiyor',
        },
        planlama: {
          type: 'string',
          example: 'Planlama yetkinlikleri yeterli.',
        },
        hedefler: {
          type: 'string',
          example: 'Bu yıl KPI hedefleri tamamen karşılandı.',
        },
        diger: {
          type: 'string',
          example: 'Ek bilgi bulunmamaktadır.',
        },
        calisan_yorum: {
          type: 'string',
          example: 'Çalışan kendi performansını olumlu değerlendiriyor.',
        },
        sinav_turu_id: {
          type: 'number',
          example: 3,
          description: 'Sınav türü ID (örn: yıllık / dönemlik değerlendirme)',
        },
      },
      required: [
        'tarih',
        'sinav_olan_personel_id',
        'sinav_yapan_personel_id',
        'sinav_turu_id',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Sınav başarıyla oluşturuldu',
    type: Sinav,
  })
  async create(@Body() createSinavDto: CreateSinavDto): Promise<Sinav> {
    return this.sinavService.create(createSinavDto);
  }

  // GET /sinav
  @Get()
  @ApiOperation({ summary: 'Tüm sınavları listele' })
  @ApiResponse({
    status: 200,
    description: 'Sınav listesi başarıyla getirildi',
    type: [Sinav],
  })
  async findAll(): Promise<Sinav[]> {
    return this.sinavService.findAll();
  }

  // GET /sinav/:id
  @Get(':id')
  @ApiOperation({
    summary: 'ID’ye göre sınav getir',
    description:
      'Opsiyonel olarak detayları (`sinav-detay`) birlikte getirilir. `?detaylariYukle=true` kullan.',
  })
  @ApiParam({
    name: 'id',
    example: 10,
    description: 'Sınav ID',
  })
  @ApiQuery({
    name: 'detaylariYukle',
    required: false,
    example: 'true',
    description:
      'Sınav detaylarının yüklenmesini sağlar (default: false). true/false',
  })
  @ApiResponse({
    status: 200,
    description: 'Sınav başarıyla bulundu',
    type: Sinav,
  })
  @ApiResponse({
    status: 404,
    description: 'Sınav bulunamadı',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('detaylariYukle') loadDetails: string = 'false',
  ): Promise<Sinav> {
    const shouldLoadDetails = loadDetails.toLowerCase() === 'true';
    return this.sinavService.findOne(id, shouldLoadDetails);
  }

  // Put /sinav/:id
  @Put(':id')
  @ApiOperation({ summary: 'Bir sınavı güncelle' })
  @ApiParam({
    name: 'id',
    example: 6,
    description: 'Güncellenecek sınav ID',
  })
  @ApiBody({
    description: 'Güncellenecek sınav alanları',
    schema: {
      type: 'object',
      properties: {
        tarih: { type: 'string', example: '2025-03-20' },
        zorunlu_egitim: { type: 'boolean', example: true },
        zorunlu_egitim_aciklama: {
          type: 'string',
          example: 'Zorunlu eğitim alınmalıdır.',
        },
        planlama: { type: 'string', example: 'Planlama zayıf.' },
        hedefler: { type: 'string', example: 'Yeni hedefler belirlendi.' },
        diger: { type: 'string', example: 'Ek açıklama' },
        calisan_yorum: {
          type: 'string',
          example: 'Çalışan performans düşüklüğünü kabul ediyor.',
        },
        sinav_turu_id: { type: 'number', example: 2 },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sınav başarıyla güncellendi',
    type: Sinav,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSinavDto: UpdateSinavDto,
  ): Promise<Sinav> {
    return this.sinavService.update(id, updateSinavDto);
  }

  // DELETE /sinav/:id
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Bir sınavı sil' })
  @ApiParam({
    name: 'id',
    example: 4,
    description: 'Silinecek sınav ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Sınav silindi',
  })
  @ApiResponse({
    status: 404,
    description: 'Sınav bulunamadı',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.sinavService.remove(id);
  }
}