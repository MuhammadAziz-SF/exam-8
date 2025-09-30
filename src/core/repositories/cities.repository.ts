import { Repository } from 'typeorm';
import { CitiesEntity } from '../entities/cities.entity';

export type CitiesRepository = Repository<CitiesEntity>;
