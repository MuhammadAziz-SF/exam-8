import { Repository } from 'typeorm';
import { FlightsEntity } from '../entities/flights.entity';

export type FlightRepository = Repository<FlightsEntity>;
