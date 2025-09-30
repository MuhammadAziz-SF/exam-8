import { Repository } from 'typeorm';
import { SeatsEntity } from '../entities/seats.entity';

export type SeatsRepository = Repository<SeatsEntity>;
