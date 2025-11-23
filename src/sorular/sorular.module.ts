import { Module } from '@nestjs/common';
import { SorularController } from './sorular.controller';
import { SorularService } from './sorular.service';

@Module({
  controllers: [SorularController],
  providers: [SorularService]
})
export class SorularModule {}
