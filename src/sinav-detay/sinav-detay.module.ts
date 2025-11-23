import { Module } from '@nestjs/common';
import { SinavDetayController } from './sinav-detay.controller';
import { SinavDetayService } from './sinav-detay.service';

@Module({
  controllers: [SinavDetayController],
  providers: [SinavDetayService]
})
export class SinavDetayModule {}
