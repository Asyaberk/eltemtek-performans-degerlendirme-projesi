import { Module } from '@nestjs/common';
import { SorularController } from './controller/sorular.controller';
import { SorularService } from './service/sorular.service';
import { Soru } from './entities/sorular.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorularRepository } from './repository/sorular.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Soru])],
  controllers: [SorularController],
  providers: [SorularService, SorularRepository],
  exports: [SorularService, SorularRepository],
})
export class SorularModule {}
