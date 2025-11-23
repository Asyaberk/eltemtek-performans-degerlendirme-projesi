import { Module } from '@nestjs/common';
import { PersonelController } from './personel.controller';
import { PersonelService } from './personel.service';

@Module({
  controllers: [PersonelController],
  providers: [PersonelService]
})
export class PersonelModule {}
