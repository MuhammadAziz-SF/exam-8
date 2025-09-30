import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Return all reviews.' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({ status: 200, description: 'Return the review.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
