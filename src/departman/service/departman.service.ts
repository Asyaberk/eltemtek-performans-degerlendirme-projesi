import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DepartmanRepository } from '../repository/departman.repository';
import { Departman } from '../entities/departman.entity';
import { CreateDepartmanDto } from '../dtos/createDepartman.dto';
import { UpdateDepartmanDto } from '../dtos/updateDepartman.dto';

@Injectable()
export class DepartmanService {
  constructor(private readonly departmanRepository: DepartmanRepository) {}


  async findDept(dept_id: number): Promise<Departman> {
    const departman = await this.departmanRepository.findById(dept_id);

    if (!departman) {
      throw new NotFoundException(`Departman (ID: ${dept_id}) bulunamadı.`);
    }
    return departman;
  }

  async findAll(): Promise<Departman[]> {
    return this.departmanRepository.findAll();
  }

  async create(createDepartmanDto: CreateDepartmanDto): Promise<Departman> {
    const mevcutDepartman = await this.departmanRepository.findByName(
      createDepartmanDto.name,
    );
    if (mevcutDepartman) {
      throw new ConflictException(
        `Departman adı '${createDepartmanDto.name}' zaten mevcut.`,
      );
    }

    return this.departmanRepository.create({ name: createDepartmanDto.name });
  }

  async update(dept_id: number, updateDepartmanDto: UpdateDepartmanDto): Promise<Departman> {
    const departman = await this.findDept(dept_id);
    if (updateDepartmanDto.name) {
      departman.name = updateDepartmanDto.name;
    }
    return this.departmanRepository.update(departman);
  }

  async remove(dept_id: number): Promise<{ message: string }> {
    await this.findDept(dept_id);
    const result = await this.departmanRepository.delete(dept_id);

    if (result.affected === 0) {
      throw new NotFoundException(`Departman (ID: ${dept_id}) bulunamadı.`);
    }

    return {
      message: `Departman (ID: ${dept_id}) başarıyla silindi.`,
    };
  }
}
