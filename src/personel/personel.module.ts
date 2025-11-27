import { Module } from '@nestjs/common';
import { PersonelController } from './controller/personel.controller';
import { PersonelService } from './service/personel.service';
import { Personel } from './entities/personel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonelRepository } from './repository/personel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Personel])],
  controllers: [PersonelController],
  providers: [PersonelService, PersonelRepository],
  exports: [PersonelService, PersonelRepository],
})
export class PersonelModule {}
