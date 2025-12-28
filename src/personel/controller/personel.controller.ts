import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, HttpCode, Put, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { PersonelService } from '../service/personel.service';
import { Personel } from '../entities/personel.entity';
import { CreatePersonelDto } from '../dtos/createPersonel.dto';
import { UpdatePersonelDto } from '../dtos/updatePersonel.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

//We add these because the password field is automatically removed from the response.
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('İdari Şef', 'Müdür', 'Genel Müdür', 'Direktör')
@ApiTags('Personel')
@Controller('personel')
export class PersonelController {
  constructor(private readonly personelService: PersonelService) {}

  //create personel
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Yeni personel oluştur' })
  @ApiBody({
    description: 'Yeni personel bilgileri',
    schema: {
      type: 'object',
      properties: {
        sicil_no: {
          type: 'string',
          example: '123456',
          description: 'Personel sicil numarası',
        },
        name: {
          type: 'string',
          example: 'İrem Yılmaz',
          description: 'Personelin adı ve soyadı',
        },
        dept_id: {
          type: 'number',
          example: 1,
          description: 'Personelin bağlı olduğu departman ID',
        },
        role_id: {
          type: 'number',
          example: 2,
          description: 'Personelin rol ID’si',
        },
      },
      required: ['sicil_no', 'name', 'dept_id', 'role_id'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Personel başarıyla oluşturuldu',
    type: Personel,
  })
  @ApiResponse({
    status: 400,
    description: 'Validasyon hatası veya geçersiz departman/rol ID',
  })
  async create(
    @Body() createPersonelDto: CreatePersonelDto,
  ): Promise<Personel> {
    return this.personelService.create(createPersonelDto);
  }

  //list all personel
  @Get()
  @ApiOperation({ summary: 'Tüm personelleri listele' })
  @ApiResponse({
    status: 200,
    description: 'Personel listesi başarıyla getirildi',
    type: [Personel],
  })
  async findAll(): Promise<Personel[]> {
    return this.personelService.findAll();
  }

  //get one personel
  @Get(':id')
  @ApiOperation({ summary: 'ID’ye göre personel getir' })
  @ApiParam({ name: 'id', example: 3, description: 'Personel ID' })
  @ApiResponse({ status: 200, description: 'Personel bulundu', type: Personel })
  @ApiResponse({ status: 404, description: 'Personel bulunamadı' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Personel> {
    return this.personelService.findOne(id);
  }

  //updtae a personel info
  @Put(':id')
  @ApiOperation({ summary: 'Personel bilgilerini güncelle' })
  @ApiParam({
    name: 'id',
    example: 3,
    description: 'Güncellenecek personel ID',
  })
  @ApiBody({
    description: 'Güncellenecek bilgiler',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'İrem Kaya',
          description: 'Yeni personel adı',
        },
        dept_id: {
          type: 'number',
          example: 2,
          description: 'Yeni bağlı olduğu departman ID',
        },
        role_id: {
          type: 'number',
          example: 4,
          description: 'Yeni rol ID',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Personel güncellendi',
    type: Personel,
  })
  @ApiResponse({ status: 404, description: 'Personel bulunamadı' })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePersonelDto: UpdatePersonelDto,
  ): Promise<Personel> {
    return this.personelService.update(id, updatePersonelDto);
  }

  //delete
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Personel sil' })
  @ApiParam({ name: 'id', example: 5, description: 'Silinecek personel ID' })
  @ApiResponse({ status: 204, description: 'Personel silindi (no content)' })
  @ApiResponse({ status: 404, description: 'Personel bulunamadı' })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    await this.personelService.remove(id);
  }
}