import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly rolRepo: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.rolRepo.find();
  }

  async findByName(name: string): Promise<Role | null> {
    return this.rolRepo.findOne({ where: { name } });
  }

  async findById(role_id: number): Promise<Role | null> {
    return this.rolRepo.findOneBy({ role_id });
  }

  async create(rolData: Partial<Role>): Promise<Role> {
    const yeniRol = this.rolRepo.create(rolData);
    return this.rolRepo.save(yeniRol);
  }

  async update(rol: Role): Promise<Role> {
    return this.rolRepo.save(rol);
  }

  async delete(role_id: number): Promise<DeleteResult> {
    return this.rolRepo.delete(role_id);
  }
}
