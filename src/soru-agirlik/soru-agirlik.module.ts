import { Module } from '@nestjs/common';
import { SoruAgirlikController } from './soru-agirlik.controller';
import { SoruAgirlikService } from './soru-agirlik.service';

@Module({
  controllers: [SoruAgirlikController],
  providers: [SoruAgirlikService]
})
export class SoruAgirlikModule {}
