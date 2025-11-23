import { Module } from '@nestjs/common';
import { SorularController } from './controller/sorular.controller';
import { SorularService } from './service/sorular.service';
import { Soru } from './entities/sorular.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Soru])],
  controllers: [SorularController],
  providers: [SorularService]
})
export class SorularModule {}
