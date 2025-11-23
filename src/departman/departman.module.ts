import { Module } from '@nestjs/common';
import { DepartmanController } from './controller/departman.controller';
import { DepartmanService } from './service/departman.service';
import { Departman } from './entities/departman.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Departman])],
  controllers: [DepartmanController],
  providers: [DepartmanService],
})
export class DepartmanModule {}
