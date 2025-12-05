import { Module } from '@nestjs/common';
import { SinavDetayController } from './controller/sinav-detay.controller';
import { SinavDetayService } from './service/sinav-detay.service';
import { SinavDetay } from './entities/sinav-detay.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorularModule } from 'src/sorular/sorular.module';
import { SinavModule } from 'src/sinav/sinav.module';
import { SinavDetayRepository } from './repository/sinav-detay.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SinavDetay]), SorularModule, SinavModule],
  controllers: [SinavDetayController],
  providers: [SinavDetayService, SinavDetayRepository],
  exports: [SinavDetayService, SinavDetayRepository],
})
export class SinavDetayModule {}
