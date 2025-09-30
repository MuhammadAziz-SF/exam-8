import { Repository } from 'typeorm';
import { ReviewsEntity } from '../entities/reviews.entity';

export type ReviewsRepository = Repository<ReviewsEntity>;
