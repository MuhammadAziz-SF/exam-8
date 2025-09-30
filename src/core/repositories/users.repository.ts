import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users.entity';

export type UserRepository = Repository<UserEntity>;
