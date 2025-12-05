import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpCode, Put } from '@nestjs/common';
import { SinavDetayService } from '../service/sinav-detay.service';
import { SinavDetay } from '../entities/sinav-detay.entity';
import { CreateSinavDetayDto } from '../dtos/createSinavDetay.dto';
import { UpdateSinavDetayDto } from '../dtos/updateSinavDetay.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sınav Detay')
@Controller('sinav-detay')
export class SinavDetayController {
  constructor(private readonly detayService: SinavDetayService) {}

  // POST /sinav-detay
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Yeni sınav detay kaydı oluştur',
    description:
      'Bir sınavda bir soruya verilen puanı ve yorumu kaydeder. (Her sınav + soru ikilisi sadece 1 kere olabilir)',
  })
  @ApiBody({
    description: 'Sınav detay bilgileri',
    schema: {
      type: 'object',
      properties: {
        puan: {
          type: 'number',
          example: 3,
          description: 'Verilen puan (1 - 4)',
        },
        yorum: {
          type: 'string',
          example: 'Çalışan görevini eksiksiz yerine getiriyor.',
          description: 'Soruya verilen açıklama / yorum',
        },
        sinav_id: {
          type: 'number',
          example: 10,
          description: 'Detayın ait olduğu sınav ID',
        },
        soru_id: {
          type: 'number',
          example: 4,
          description: 'Detayın ait olduğu soru ID',
        },
      },
      required: ['puan', 'yorum', 'sinav_id', 'soru_id'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Sınav detay başarıyla oluşturuldu',
    type: SinavDetay,
  })
  @ApiResponse({
    status: 400,
    description:
      'Validasyon hatası veya aynı sınav + soru için zaten detay var.',
  })
  async create(
    @Body() createDetayDto: CreateSinavDetayDto,
  ): Promise<SinavDetay> {
    return this.detayService.create(createDetayDto);
  }

  // GET /sinav-detay
  @Get()
  @ApiOperation({ summary: 'Tüm sınav detaylarını listele' })
  @ApiResponse({
    status: 200,
    description: 'Detay listesi başarıyla getirildi',
    type: [SinavDetay],
  })
  async findAll(): Promise<SinavDetay[]> {
    return this.detayService.findAll();
  }

  // GET /sinav-detay/:id
  @Get(':id')
  @ApiOperation({ summary: 'ID’ye göre sınav detayı getir' })
  @ApiParam({
    name: 'id',
    example: 5,
    description: 'Detay ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Sınav detayı bulundu',
    type: SinavDetay,
  })
  @ApiResponse({
    status: 404,
    description: 'Detay bulunamadı',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SinavDetay> {
    return this.detayService.findOne(id);
  }

  // Put /sinav-detay/:id
  @Put(':id')
  @ApiOperation({ summary: 'Bir sınav detayını güncelle' })
  @ApiParam({
    name: 'id',
    example: 3,
    description: 'Güncellenecek detay ID',
  })
  @ApiBody({
    description: 'Güncellenecek detay bilgileri',
    schema: {
      type: 'object',
      properties: {
        puan: {
          type: 'number',
          example: 4,
          description: 'Yeni puan (1 - 4)',
        },
        yorum: {
          type: 'string',
          example: 'Performansı bu dönem oldukça yükseldi.',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Detay başarıyla güncellendi',
    type: SinavDetay,
  })
  @ApiResponse({
    status: 404,
    description: 'Detay bulunamadı',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetayDto: UpdateSinavDetayDto,
  ): Promise<SinavDetay> {
    return this.detayService.update(id, updateDetayDto);
  }

  // DELETE /sinav-detay/:id
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Bir sınav detayını sil' })
  @ApiParam({
    name: 'id',
    example: 12,
    description: 'Silinecek detay ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Detay başarıyla silindi',
  })
  @ApiResponse({
    status: 404,
    description: 'Detay bulunamadı',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.detayService.remove(id);
  }
}