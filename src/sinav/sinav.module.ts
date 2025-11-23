import { Module } from '@nestjs/common';
import { SinavController } from './sinav.controller';
import { SinavService } from './sinav.service';

@Module({
  controllers: [SinavController],
  providers: [SinavService]
})
export class SinavModule {}
