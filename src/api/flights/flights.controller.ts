import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightSearchDto } from './dto/flight-search.dto';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flight' })
  @ApiResponse({
    status: 201,
    description: 'The flight has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all flights' })
  @ApiResponse({ status: 200, description: 'Return all flights.' })
  findAll() {
    return this.flightsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for flights' })
  @ApiResponse({ status: 200, description: 'Return matching flights.' })
  search(@Query() searchDto: FlightSearchDto) {
    return this.flightsService.search(searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a flight by ID' })
  @ApiResponse({ status: 200, description: 'Return the flight.' })
  @ApiResponse({ status: 404, description: 'Flight not found.' })
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a flight' })
  @ApiResponse({
    status: 200,
    description: 'The flight has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Flight not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flight' })
  @ApiResponse({
    status: 200,
    description: 'The flight has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Flight not found.' })
  remove(@Param('id') id: string) {
    return this.flightsService.remove(id);
  }
}
