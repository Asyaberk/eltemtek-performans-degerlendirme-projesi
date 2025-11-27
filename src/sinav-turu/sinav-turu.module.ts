import { Module } from '@nestjs/common';
import { SinavTuruController } from './controller/sinav-turu.controller';
import { SinavTuruService } from './service/sinav-turu.service';
import { SinavTuru } from './entities/sinav-turu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SinavTuruRepository } from './repository/sinav-turu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SinavTuru])],
  controllers: [SinavTuruController],
  providers: [SinavTuruService, SinavTuruRepository],
  exports: [SinavTuruService, SinavTuruRepository],
})
export class SinavTuruModule {}
