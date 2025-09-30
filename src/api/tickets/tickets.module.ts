import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { SeatsEntity } from 'src/core/entities/seats.entity';
import { TicketsEntity } from 'src/core/entities/tickets.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsEntity, FlightsEntity, SeatsEntity]),
  ],
  providers: [TicketsService],
})
export class TicketsModule {}
