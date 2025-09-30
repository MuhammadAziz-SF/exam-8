import { Repository } from 'typeorm';
import { LoyaltyProgramEntity } from '../entities/loyalty-programm.entity';

export type LoyaltyProgramRepository = Repository<LoyaltyProgramEntity>;
