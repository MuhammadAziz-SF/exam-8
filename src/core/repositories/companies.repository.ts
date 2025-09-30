import { Repository } from 'typeorm';
import { CompaniesEntity } from '../entities/companies.entity';

export type CompaniesRepository = Repository<CompaniesEntity>;
