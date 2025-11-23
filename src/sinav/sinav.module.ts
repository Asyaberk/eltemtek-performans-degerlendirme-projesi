import { Module } from '@nestjs/common';
import { SinavController } from './controller/sinav.controller';
import { SinavService } from './service/sinav.service';
import { Sinav } from './entities/sinav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sinav])],
  controllers: [SinavController],
  providers: [SinavService]
})
export class SinavModule {}
