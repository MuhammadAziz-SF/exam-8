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
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new seat' })
  @ApiResponse({
    status: 201,
    description: 'The seat has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all seats' })
  @ApiResponse({ status: 200, description: 'Return all seats.' })
  findAll() {
    return this.seatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a seat by ID' })
  @ApiResponse({ status: 200, description: 'Return the seat.' })
  @ApiResponse({ status: 404, description: 'Seat not found.' })
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a seat' })
  @ApiResponse({
    status: 200,
    description: 'The seat has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Seat not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatsService.update(+id, updateSeatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a seat' })
  @ApiResponse({
    status: 200,
    description: 'The seat has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Seat not found.' })
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id);
  }
}
