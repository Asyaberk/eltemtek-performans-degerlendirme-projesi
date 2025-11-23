import { Module } from '@nestjs/common';
import { PersonelController } from './controller/personel.controller';
import { PersonelService } from './service/personel.service';
import { Personel } from './entities/personel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Personel])],
  controllers: [PersonelController],
  providers: [PersonelService]
})
export class PersonelModule {}
