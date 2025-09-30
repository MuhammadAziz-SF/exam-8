import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesEntity } from 'src/core/entities/classes.entity';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassesEntity])],
  providers: [ClassesService],
})
export class ClassesModule {}
