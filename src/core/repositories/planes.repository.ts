import { Repository } from 'typeorm';
import { PlanesEntity } from '../entities/planes.entity';

export type PlanesRepository = Repository<PlanesEntity>;
