import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dtos/createRole.dto';
import { UpdateRoleDto } from '../dtos/updateRole.dto';

@Injectable()
export class RoleService {
  constructor(private readonly rolRepository: RoleRepository) {}

  async findOne(role_id: number): Promise<Role> {
    const rol = await this.rolRepository.findById(role_id);
    if (!rol) {
      throw new NotFoundException(`Rol (ID: ${role_id}) bulunamadı.`);
    }
    return rol;
  }

  async findAll(): Promise<Role[]> {
    return this.rolRepository.findAll();
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const mevcutRol = await this.rolRepository.findByName(createRoleDto.name);

    if (mevcutRol) {
      throw new ConflictException(
        `Rol adı '${createRoleDto.name}' zaten var.`,
      );
    }

    return this.rolRepository.create(createRoleDto);
  }

  async update(role_id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    //Kaydı bul 
    const rol = await this.findOne(role_id);
    //DTO'dan gelen verileri kayda yansıt
    Object.assign(rol, updateRoleDto); 
    //Güncel kaydı kaydet
    return this.rolRepository.update(rol);
  }

  async remove(role_id: number): Promise<{ message: string }> {
    await this.findOne(role_id);
    const result = await this.rolRepository.delete(role_id);

    if (result.affected === 0) {
      throw new NotFoundException(`Rol (ID: ${role_id}) bulunamadı.`);
    }

    return {
      message: `Rol (ID: ${role_id}) başarıyla silindi.`,
    };
  }
}
