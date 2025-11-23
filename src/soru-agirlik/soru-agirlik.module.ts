import { Module } from '@nestjs/common';
import { SoruAgirlikController } from './controller/soru-agirlik.controller';
import { SoruAgirlikService } from './service/soru-agirlik.service';
import { SoruAgirlik } from './entities/soru-agirlik.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SoruAgirlik])],
  controllers: [SoruAgirlikController],
  providers: [SoruAgirlikService]
})
export class SoruAgirlikModule {}
