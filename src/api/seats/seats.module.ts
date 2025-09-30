import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { SeatsEntity } from 'src/core/entities/seats.entity';
import { TicketsEntity } from 'src/core/entities/tickets.entity';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeatsEntity, FlightsEntity, TicketsEntity]),
  ],
  providers: [SeatsService],
})
export class SeatsModule {}
