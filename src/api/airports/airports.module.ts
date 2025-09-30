import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportsEntity } from 'src/core/entities/airports.entity';
import { AirportsService } from './airports.service';
import { AirportsController } from './airports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AirportsEntity])],
  providers: [AirportsService],
})
export class AirportsModule {}
