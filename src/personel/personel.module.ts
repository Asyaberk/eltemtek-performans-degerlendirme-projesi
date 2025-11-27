import { Module } from '@nestjs/common';
import { PersonelController } from './controller/personel.controller';
import { PersonelService } from './service/personel.service';
import { Personel } from './entities/personel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonelRepository } from './repository/personel.repository';
import { DepartmanModule } from 'src/departman/departman.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Personel]), DepartmanModule, RoleModule],
  controllers: [PersonelController],
  providers: [PersonelService, PersonelRepository],
  exports: [PersonelService, PersonelRepository],
})
export class PersonelModule {}
