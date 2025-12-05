import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpCode, Put } from '@nestjs/common';
import { SoruAgirlikService } from '../service/soru-agirlik.service';
import { SoruAgirlik } from '../entities/soru-agirlik.entity';
import { CreateSoruAgirlikDto } from '../dtos/createSoruAgirlik.dto';
import { UpdateSoruAgirlikDto } from '../dtos/updateSoruAgirlik.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Soru Ağırlık')
@Controller('soru-agirlik')
export class SoruAgirlikController {
  constructor(private readonly agirlikService: SoruAgirlikService) {}

  // POST /soru-agirlik
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Yeni soru ağırlığı oluştur' })
  @ApiBody({
    description:
      'Rol + Soru için ağırlık değeri tanımlama isteği. Bir role aynı soru ikinci kez eklenemez.',
    schema: {
      type: 'object',
      properties: {
        agirlik: {
          type: 'number',
          example: 1.5,
          description: 'Soru ağırlığı (0 - 2 arası decimal)',
        },
        role_id: {
          type: 'number',
          example: 2,
          description: 'Ağırlığın ait olduğu role ID',
        },
        soru_id: {
          type: 'number',
          example: 5,
          description: 'Ağırlığın ait olduğu soru ID',
        },
      },
      required: ['agirlik', 'role_id', 'soru_id'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Soru ağırlığı başarıyla oluşturuldu',
    type: SoruAgirlik,
  })
  @ApiResponse({
    status: 400,
    description:
      'Validasyon hatası veya duplicated weight (aynı role + soru ikilisi zaten var)',
  })
  async create(
    @Body() createAgirlikDto: CreateSoruAgirlikDto,
  ): Promise<SoruAgirlik> {
    return this.agirlikService.create(createAgirlikDto);
  }

  // GET /soru-agirlik
  @Get()
  @ApiOperation({ summary: 'Tüm soru ağırlıklarını listele' })
  @ApiResponse({
    status: 200,
    description: 'Ağırlık listesi başarıyla getirildi',
    type: [SoruAgirlik],
  })
  async findAll(): Promise<SoruAgirlik[]> {
    return this.agirlikService.findAll();
  }

  // GET /soru-agirlik/:id
  @Get(':id')
  @ApiOperation({ summary: 'ID’ye göre soru ağırlığı getir' })
  @ApiParam({
    name: 'id',
    example: 7,
    description: 'Ağırlık ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Soru ağırlığı bulundu',
    type: SoruAgirlik,
  })
  @ApiResponse({ status: 404, description: 'Ağırlık bulunamadı' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SoruAgirlik> {
    return this.agirlikService.findOne(id);
  }

  // PUT /soru-agirlik/:id
  @Put(':id')
  @ApiOperation({ summary: 'Soru ağırlığını güncelle' })
  @ApiParam({
    name: 'id',
    example: 4,
    description: 'Güncellenecek ağırlık ID',
  })
  @ApiBody({
    description: 'Güncellenecek ağırlık bilgileri',
    schema: {
      type: 'object',
      properties: {
        agirlik: {
          type: 'number',
          example: 1.5,
        },
        role_id: {
          type: 'number',
          example: 3,
        },
        soru_id: {
          type: 'number',
          example: 8,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Ağırlık güncellendi',
    type: SoruAgirlik,
  })
  @ApiResponse({ status: 404, description: 'Ağırlık bulunamadı' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgirlikDto: UpdateSoruAgirlikDto,
  ): Promise<SoruAgirlik> {
    return this.agirlikService.update(id, updateAgirlikDto);
  }

  // DELETE /soru-agirlik/:id
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Bir soru ağırlığını sil' })
  @ApiParam({
    name: 'id',
    example: 10,
    description: 'Silinecek ağırlık ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Ağırlık başarıyla silindi',
  })
  @ApiResponse({ status: 404, description: 'Ağırlık bulunamadı' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.agirlikService.remove(id);
  }
}