import { Module } from '@nestjs/common';
import { DepartmanController } from './departman.controller';
import { DepartmanService } from './departman.service';

@Module({
  controllers: [DepartmanController],
  providers: [DepartmanService]
})
export class DepartmanModule {}
