import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanesEntity } from 'src/core/entities/planes.entity';
import { SeatsEntity } from 'src/core/entities/seats.entity';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanesEntity, SeatsEntity])],
  providers: [PlanesService],
})
export class PlanesModule {}
