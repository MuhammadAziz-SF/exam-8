import { Repository } from 'typeorm';
import { ClassesEntity } from '../entities/classes.entity';

export type ClassesRepository = Repository<ClassesEntity>;
