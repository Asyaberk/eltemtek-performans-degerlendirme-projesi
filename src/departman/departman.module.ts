import { Module } from '@nestjs/common';
import { DepartmanController } from './controller/departman.controller';
import { DepartmanService } from './service/departman.service';
import { Departman } from './entities/departman.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmanRepository } from './repository/departman.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Departman])],
  controllers: [DepartmanController],
  providers: [DepartmanService, DepartmanRepository],
  exports: [DepartmanRepository, DepartmanService],
})
export class DepartmanModule {}
