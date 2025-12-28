import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PersonelRepository } from '../repository/personel.repository';
import { DepartmanRepository } from 'src/departman/repository/departman.repository';
import { RoleRepository } from 'src/role/repository/role.repository';
import { Personel } from '../entities/personel.entity';
import { CreatePersonelDto } from '../dtos/createPersonel.dto';
import { UpdatePersonelDto } from '../dtos/updatePersonel.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonelService {
  constructor(
    private readonly personelRepository: PersonelRepository,
    private readonly departmanRepository: DepartmanRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async findOne(sicil_no: string): Promise<Personel> {
    const personel = await this.personelRepository.findBySicilNo(sicil_no);

    if (!personel) {
      throw new NotFoundException(
        `Personel (Sicil No: ${sicil_no}) bulunamadı.`,
      );
    }

    return personel;
  }

  // --- Yardımcı Fonksiyon: İlişki Varlık Kontrolü ---
  private async checkForeignKeys(
    dept_id: number,
    role_id: number,
  ): Promise<void> {
    // 1. Departman kontrolü
    const departman = await this.departmanRepository.findById(dept_id);
    if (!departman) {
      throw new NotFoundException(`Departman (ID: ${dept_id}) bulunamadı.`);
    }

    // 2. Rol kontrolü
    const rol = await this.roleRepository.findById(role_id);
    if (!rol) {
      throw new NotFoundException(`Rol (ID: ${role_id}) bulunamadı.`);
    }
  }

  async findAll(): Promise<Personel[]> {
    return this.personelRepository.findAll();
  }

  async create(createPersonelDto: CreatePersonelDto): Promise<Personel> {
    const mevcutPersonel = await this.personelRepository.findBySicilNo(
      createPersonelDto.sicil_no,
    );
    if (mevcutPersonel) {
      throw new ConflictException(
        `Sicil No '${createPersonelDto.sicil_no}' zaten mevcut.`,
      );
    }

    await this.checkForeignKeys(
      createPersonelDto.dept_id,
      createPersonelDto.role_id,
    );

    // Raporundaki güvenlik hedefleri doğrultusunda şifreleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt); // Varsayılan şifre

    const yeniPersonel = {
      ...createPersonelDto,
      password: hashedPassword,
    };

    return this.personelRepository.create(yeniPersonel);
  }

  async update(
    sicil_no: string,
    updatePersonelDto: UpdatePersonelDto,
  ): Promise<Personel> {
    const personel = await this.findOne(sicil_no);

    if (updatePersonelDto.dept_id || updatePersonelDto.role_id) {
      await this.checkForeignKeys(
        updatePersonelDto.dept_id || personel.dept_id,
        updatePersonelDto.role_id || personel.role_id,
      );
    }

    if (updatePersonelDto['password']) {
      const salt = await bcrypt.genSalt(10);
      personel.password = await bcrypt.hash(
        updatePersonelDto['password'],
        salt,
      );
      delete updatePersonelDto['password'];
    }

    Object.assign(personel, updatePersonelDto);

    return this.personelRepository.update(personel);
  }

  async remove(sicil_no: string): Promise<{ message: string }> {
    await this.findOne(sicil_no);

    const result = await this.personelRepository.delete(sicil_no);

    if (result.affected === 0) {
      throw new NotFoundException(`Personel (ID: ${sicil_no}) bulunamadı.`);
    }

    return {
      message: `Personel (ID: ${sicil_no}) başarıyla silindi.`,
    };
  }
}