import { Repository } from 'typeorm';
import { NewsEntity } from '../entities/news.entity';

export type NewsRepository = Repository<NewsEntity>;
