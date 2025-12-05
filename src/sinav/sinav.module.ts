import { Module } from '@nestjs/common';
import { SinavController } from './controller/sinav.controller';
import { SinavService } from './service/sinav.service';
import { Sinav } from './entities/sinav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonelModule } from 'src/personel/personel.module';
import { SinavTuruModule } from 'src/sinav-turu/sinav-turu.module';
import { SinavRepository } from './repository/sinav.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Sinav]), PersonelModule, SinavTuruModule],
  controllers: [SinavController],
  providers: [SinavService, SinavRepository],
  exports: [SinavService, SinavRepository],
})
export class SinavModule {}
