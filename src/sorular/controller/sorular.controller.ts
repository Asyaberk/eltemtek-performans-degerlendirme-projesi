import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpCode, Put } from '@nestjs/common';
import { SorularService } from '../service/sorular.service';
import { Soru } from '../entities/sorular.entity';
import { CreateSoruDto } from '../dtos/createSoru.dto';
import { UpdateSoruDto } from '../dtos/updateSoru.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('sorular')
export class SorularController {
    constructor(private readonly sorularService: SorularService) { }

    // POST /sorular
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Yeni soru oluştur' })
    @ApiBody({
        description: 'Oluşturulacak soru bilgileri',
        schema: {
            type: 'object',
            properties: {
                soru_metni: {
                    type: 'string',
                    example: 'Çalışan iş güvenliği kurallarına uyuyor mu?',
                    description: 'Soru metni (zorunlu)',
                },
            },
            required: ['soru_metni'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Soru başarıyla oluşturuldu',
        type: Soru,
    })
    @ApiResponse({
        status: 400,
        description: 'Validasyon hatası',
    })
    async create(@Body() createSoruDto: CreateSoruDto): Promise<Soru> {
        return this.sorularService.create(createSoruDto);
    }

    // GET /sorular
    @Get()
    @ApiOperation({ summary: 'Tüm soruları listele' })
    @ApiResponse({
        status: 200,
        description: 'Sorular başarıyla listelendi',
        type: [Soru],
    })
    async findAll(): Promise<Soru[]> {
        return this.sorularService.findAll();
    }

    // GET /sorular/:id
    @Get(':id')
    @ApiOperation({ summary: 'ID’ye göre soru getir' })
    @ApiParam({
        name: 'id',
        example: 1,
        description: 'Soru ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Soru bulundu',
        type: Soru,
    })
    @ApiResponse({
        status: 404,
        description: 'Soru bulunamadı',
    })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Soru> {
        return this.sorularService.findOne(id);
    }

    // OUT /sorular/:id
    @Put(':id')
    @ApiOperation({ summary: 'Bir soruyu güncelle' })
    @ApiParam({
        name: 'id',
        example: 4,
        description: 'Güncellenecek soru ID',
    })
    @ApiBody({
        description: 'Güncelleme bilgileri',
        schema: {
            type: 'object',
            properties: {
                soru_metni: {
                    type: 'string',
                    example: 'Çalışan ekip içinde etkin iletişim kuruyor mu?',
                    description: 'Yeni soru metni',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Soru güncellendi',
        type: Soru,
    })
    @ApiResponse({
        status: 404,
        description: 'Soru bulunamadı',
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSoruDto: UpdateSoruDto,
    ): Promise<Soru> {
        return this.sorularService.update(id, updateSoruDto);
    }

    // DELETE /sorular/:id
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Bir soruyu sil' })
    @ApiParam({
        name: 'id',
        example: 3,
        description: 'Silinecek soru ID',
    })
    @ApiResponse({
        status: 204,
        description: 'Soru başarıyla silindi',
    })
    @ApiResponse({
        status: 404,
        description: 'Soru bulunamadı',
    })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.sorularService.remove(id);
    }
}