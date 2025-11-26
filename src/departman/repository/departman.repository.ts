import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Departman } from '../entities/departman.entity';

@Injectable()
export class DepartmanRepository {
  constructor(
    @InjectRepository(Departman)
    private readonly departmanRepo: Repository<Departman>,
  ) {}

  async findAll(): Promise<Departman[]> {
    return this.departmanRepo.find();
  }

  async findByName(name: string): Promise<Departman | null> {
    return this.departmanRepo.findOne({ where: { name } });
  }

  async findById(dept_id: number): Promise<Departman | null> {
    return this.departmanRepo.findOneBy({ dept_id });
  }

  async create(departmanData: Partial<Departman>): Promise<Departman> {
    const yeniDepartman = this.departmanRepo.create(departmanData);
    return this.departmanRepo.save(yeniDepartman);
  }

  //Güncelleme
  async update(departman: Departman): Promise<Departman> {
    return this.departmanRepo.save(departman);
  }

  //Silme
  async delete(dept_id: number): Promise<DeleteResult> {
    return this.departmanRepo.delete(dept_id);
  }
}
