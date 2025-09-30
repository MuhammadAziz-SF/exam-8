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
import { LoyaltyProgramService } from './loyalty-program.service.js';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto.js';
import { UpdateLoyaltyProgramDto } from './dto/update-loyalty-program.dto.js';

@ApiTags('Loyalty Program')
@Controller('loyalty-program')
export class LoyaltyProgramController {
  constructor(private readonly loyaltyProgramService: LoyaltyProgramService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loyalty program entry' })
  @ApiResponse({
    status: 201,
    description: 'The entry has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loyalty program entries' })
  @ApiResponse({ status: 200, description: 'Return all entries.' })
  findAll() {
    return this.loyaltyProgramService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a loyalty program entry by ID' })
  @ApiResponse({ status: 200, description: 'Return the entry.' })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  findOne(@Param('id') id: string) {
    return this.loyaltyProgramService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a loyalty program entry' })
  @ApiResponse({
    status: 200,
    description: 'The entry has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(
    @Param('id') id: string,
    @Body() updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    return this.loyaltyProgramService.update(+id, updateLoyaltyProgramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a loyalty program entry' })
  @ApiResponse({
    status: 200,
    description: 'The entry has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Entry not found.' })
  remove(@Param('id') id: string) {
    return this.loyaltyProgramService.remove(+id);
  }
}
