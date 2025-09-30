import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportsEntity } from 'src/core/entities/airports.entity';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { PlanesEntity } from 'src/core/entities/planes.entity';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlightsEntity, PlanesEntity, AirportsEntity]),
  ],
  providers: [FlightsService],
})
export class FlightsModule {}
