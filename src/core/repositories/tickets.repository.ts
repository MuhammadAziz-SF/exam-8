import { Repository } from 'typeorm';
import { TicketsEntity } from '../entities/tickets.entity';

export type TicketsRepository = Repository<TicketsEntity>;
