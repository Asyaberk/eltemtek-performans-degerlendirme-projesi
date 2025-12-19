import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { SinavTuruService } from '../service/sinav-turu.service';
import { SinavTuru } from '../entities/sinav-turu.entity';
import { CreateSinavTuruDto } from '../dtos/createSinavTuru.dto';
import { UpdateSinavTuruDto } from '../dtos/updateSinavTuru.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard) 
@Roles('İnsan Kaynakları')
@ApiTags('Sınav Türü')
@Controller('sinav-turu')
export class SinavTuruController {
  constructor(private readonly sinavTuruService: SinavTuruService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Yeni sınav türü oluştur' })
  @ApiBody({
    description: 'Oluşturulacak sınav türü bilgileri',
    schema: {
      type: 'object',
      properties: {
        ad: {
          type: 'string',
          example: 'Yıllık Performans Değerlendirmesi',
          description: 'Sınav türünün adı',
        },
        aciklama: {
          type: 'string',
          example: 'Her yıl yapılan standart performans değerlendirme sınavı',
          description: 'Sınav türü ile ilgili açıklama (opsiyonel)',
        },
      },
      required: ['ad'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Sınav türü başarıyla oluşturuldu',
    type: SinavTuru,
  })
  @ApiResponse({
    status: 400,
    description: 'Validasyon hatası veya geçersiz veri',
  })
  async create(@Body() createTurDto: CreateSinavTuruDto): Promise<SinavTuru> {
    return this.sinavTuruService.create(createTurDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm sınav türlerini listele' })
  @ApiResponse({
    status: 200,
    description: 'Sınav türleri başarıyla listelendi',
    type: [SinavTuru],
  })
  async findAll(): Promise<SinavTuru[]> {
    return this.sinavTuruService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID’ye göre sınav türü getir' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Sınav türü ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Sınav türü bulundu',
    type: SinavTuru,
  })
  @ApiResponse({
    status: 404,
    description: 'Sınav türü bulunamadı',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SinavTuru> {
    return this.sinavTuruService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Bir sınav türünü güncelle' })
  @ApiParam({
    name: 'id',
    example: 2,
    description: 'Güncellenecek sınav türü ID',
  })
  @ApiBody({
    description: 'Güncellenecek sınav türü bilgileri',
    schema: {
      type: 'object',
      properties: {
        ad: {
          type: 'string',
          example: 'Dönemlik Performans Değerlendirmesi',
          description: 'Yeni sınav türü adı',
        },
        aciklama: {
          type: 'string',
          example: '6 aylık periyotlarla yapılan değerlendirme',
          description: 'Yeni açıklama (opsiyonel)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sınav türü başarıyla güncellendi',
    type: SinavTuru,
  })
  @ApiResponse({
    status: 404,
    description: 'Sınav türü bulunamadı',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTurDto: UpdateSinavTuruDto,
  ): Promise<SinavTuru> {
    return this.sinavTuruService.update(id, updateTurDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Bir sınav türünü sil' })
  @ApiParam({
    name: 'id',
    example: 3,
    description: 'Silinecek sınav türü ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Sınav türü başarıyla silindi (no content)',
  })
  @ApiResponse({
    status: 404,
    description: 'Sınav türü bulunamadı',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.sinavTuruService.remove(id);
  }
}
