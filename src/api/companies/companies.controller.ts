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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'The company has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Return the company.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({
    status: 200,
    description: 'The company has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({
    status: 200,
    description: 'The company has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
