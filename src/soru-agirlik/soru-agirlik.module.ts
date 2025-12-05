import { Module } from '@nestjs/common';
import { SoruAgirlikController } from './controller/soru-agirlik.controller';
import { SoruAgirlikService } from './service/soru-agirlik.service';
import { SoruAgirlik } from './entities/soru-agirlik.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { SorularModule } from 'src/sorular/sorular.module';
import { SoruAgirlikRepository } from './repository/soru-agirlik.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SoruAgirlik]), RoleModule, SorularModule],
  controllers: [SoruAgirlikController],
  providers: [SoruAgirlikService, SoruAgirlikRepository],
  exports: [SoruAgirlikService, SoruAgirlikRepository],
})
export class SoruAgirlikModule {}
