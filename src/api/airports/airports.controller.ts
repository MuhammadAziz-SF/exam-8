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
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';

@ApiTags('Airports')
@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new airport' })
  @ApiResponse({
    status: 201,
    description: 'The airport has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createAirportDto: CreateAirportDto) {
    return this.airportsService.create(createAirportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all airports' })
  @ApiResponse({ status: 200, description: 'Return all airports.' })
  findAll() {
    return this.airportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an airport by ID' })
  @ApiResponse({ status: 200, description: 'Return the airport.' })
  @ApiResponse({ status: 404, description: 'Airport not found.' })
  findOne(@Param('id') id: string) {
    return this.airportsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an airport' })
  @ApiResponse({
    status: 200,
    description: 'The airport has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Airport not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateAirportDto: UpdateAirportDto) {
    return this.airportsService.update(+id, updateAirportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an airport' })
  @ApiResponse({
    status: 200,
    description: 'The airport has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Airport not found.' })
  remove(@Param('id') id: string) {
    return this.airportsService.remove(+id);
  }
}
