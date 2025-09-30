import { Repository } from 'typeorm';
import { CountriesEntity } from '../entities/countries.entity';

export type CountriesRepository = Repository<CountriesEntity>;
