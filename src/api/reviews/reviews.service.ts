import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightsEntity } from 'src/core/entities/flights.entity';
import { ReviewsEntity } from 'src/core/entities/reviews.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsEntity)
    private readonly reviewRepository: Repository<ReviewsEntity>,
    @InjectRepository(FlightsEntity)
    private readonly flightRepository: Repository<FlightsEntity>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const flight = await this.flightRepository.findOneBy({
      id: createReviewDto.flightId,
    });
    if (!flight) {
      throw new BadRequestException(
        `Flight with ID "${createReviewDto.flightId}" not found.`,
      );
    }
    // As per the plan, userId is not handled here.
    // This will likely fail at runtime if userId is a non-nullable column.
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found`);
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    if (updateReviewDto.flightId) {
      const flight = await this.flightRepository.findOneBy({
        id: updateReviewDto.flightId,
      });
      if (!flight) {
        throw new BadRequestException(
          `Flight with ID "${updateReviewDto.flightId}" not found.`,
        );
      }
    }
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.reviewRepository.delete(id);
    return {
      message: `Review with ID "${id}" has been successfully deleted.`,
    };
  }
}
