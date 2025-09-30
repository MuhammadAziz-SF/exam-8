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
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({
    status: 201,
    description: 'The country has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Return all countries.' })
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiResponse({ status: 200, description: 'Return the country.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiResponse({
    status: 200,
    description: 'The country has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiResponse({
    status: 200,
    description: 'The country has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  remove(@Param('id') id: string) {
    return this.countriesService.remove(id);
  }
}
