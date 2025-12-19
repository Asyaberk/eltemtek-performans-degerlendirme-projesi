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
import { RoleService } from '../service/role.service';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { UpdateRoleDto } from '../dtos/updateRole.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard) 
@Roles('İnsan Kaynakları')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    //create role
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Yeni rol oluştur' })
    @ApiBody({
        description: 'Yeni rol tanımlama isteği',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Müdür',
                    description: 'Rol adı',
                },
            },
            required: ['name'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Rol başarıyla oluşturuldu',
        type: Role,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
    })
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.roleService.create(createRoleDto);
    }

    //list roles
    @Get()
    @ApiOperation({ summary: 'Tüm rolleri listele' })
    @ApiResponse({
        status: 200,
        description: 'Rol listesi başarıyla getirildi',
        type: [Role],
    })
    async findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    //list selected role
    @Get(':id')
    @ApiOperation({ summary: 'ID’ye göre rol getir' })
    @ApiParam({
        name: 'id',
        example: 2,
        description: 'Rol ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Rol bulundu',
        type: Role,
    })
    @ApiResponse({ status: 404, description: 'Rol bulunamadı' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        return this.roleService.findOne(id);
    }

    //update a role
    @Put(':id')
    @ApiOperation({ summary: 'Belirli bir rolü güncelle' })
    @ApiParam({
        name: 'id',
        example: 1,
        description: 'Güncellenecek rol ID',
    })
    @ApiBody({
        description: 'Güncellenecek rol bilgisi',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Tekniker',
                    description: 'Yeni rol adı',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Rol başarıyla güncellendi',
        type: Role,
    })
    @ApiResponse({ status: 404, description: 'Rol bulunamadı' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ): Promise<Role> {
        return this.roleService.update(id, updateRoleDto);
    }

    //delete a role
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Bir rolü sil' })
    @ApiParam({
        name: 'id',
        example: 3,
        description: 'Silinecek rol ID',
    })
    @ApiResponse({
        status: 204,
        description: 'Rol başarıyla silindi (no content)',
    })
    @ApiResponse({ status: 404, description: 'Rol bulunamadı' })
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.roleService.remove(id);
    }
}
