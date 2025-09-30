import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { ReviewsEntity } from 'src/core/entities/reviews.entity';
import { UserEntity } from 'src/core/entities/users.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewsEntity, FlightsEntity, UserEntity]),
  ],
  providers: [ReviewsService],
})
export class ReviewsModule {}
