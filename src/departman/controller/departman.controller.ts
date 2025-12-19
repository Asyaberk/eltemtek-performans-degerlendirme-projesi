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
import { DepartmanService } from '../service/departman.service';
import { Departman } from '../entities/departman.entity';
import { CreateDepartmanDto } from '../dtos/createDepartman.dto'; 
import { UpdateDepartmanDto } from '../dtos/updateDepartman.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard) 
@Roles('İnsan Kaynakları')
@Controller('departman')
export class DepartmanController {
    constructor(private readonly departmanService: DepartmanService) { }

    //create
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Yeni departman oluştur' })
    @ApiBody({
        description: 'Oluşturulacak departman bilgileri',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Müdürlük',
                    description: 'Departman adı',
                },
            },
            required: ['name'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Departman başarıyla oluşturuldu',
        type: Departman,
    })
    @ApiResponse({ status: 400, description: 'Geçersiz veri girişi' })
    async create(
        @Body() createDepartmanDto: CreateDepartmanDto,
    ): Promise<Departman> {
        return this.departmanService.create(createDepartmanDto);
    }

    //get depts
    @Get()
    @ApiOperation({ summary: 'Tüm departmanları getir' })
    @ApiResponse({
        status: 200,
        description: 'Departman listesi başarıyla getirildi',
        type: [Departman],
    })
    async findAll(): Promise<Departman[]> {
        return this.departmanService.findAll();
    }

    //get dept by id
    @Get(':id')
    @ApiOperation({ summary: 'ID’ye göre departman getir' })
    @ApiParam({
        name: 'id',
        example: 1,
        description: 'Departman ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Departman bulundu',
        type: Departman,
    })
    @ApiResponse({ status: 404, description: 'Departman bulunamadı' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Departman> {
        return this.departmanService.findDept(id);
    }

    //update
    @Put(':id')
    @ApiOperation({ summary: 'Departman bilgilerini güncelle' })
    @ApiParam({
        name: 'id',
        example: 1,
        description: 'Güncellenecek departman ID',
    })
    @ApiBody({
        description: 'Güncelleme bilgileri',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'AR-GE',
                    description: 'Yeni departman adı',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Departman başarıyla güncellendi',
        type: Departman,
    })
    @ApiResponse({ status: 404, description: 'Departman bulunamadı' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDepartmanDto: UpdateDepartmanDto,
    ): Promise<Departman> {
        return this.departmanService.update(id, updateDepartmanDto);
    }

    //delete
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Departman sil' })
    @ApiParam({
        name: 'id',
        example: 3,
        description: 'Silinecek departman ID',
    })
    @ApiResponse({
        status: 204,
        description: 'Departman başarıyla silindi (no content)',
    })
    @ApiResponse({ status: 404, description: 'Departman bulunamadı' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.departmanService.remove(id);
    }
}
