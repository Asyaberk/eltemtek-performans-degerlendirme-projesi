import { Module } from '@nestjs/common';
import { SinavDetayController } from './controller/sinav-detay.controller';
import { SinavDetayService } from './service/sinav-detay.service';
import { SinavDetay } from './entities/sinav-detay.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SinavDetay])],
  controllers: [SinavDetayController],
  providers: [SinavDetayService]
})
export class SinavDetayModule {}
