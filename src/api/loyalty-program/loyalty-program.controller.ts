import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoyaltyProgramService } from './loyalty-program.service.js';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto.js';
import { UpdateLoyaltyProgramDto } from './dto/update-loyalty-program.dto.js';

@Controller('loyalty-program')
export class LoyaltyProgramController {
  constructor(private readonly loyaltyProgramService: LoyaltyProgramService) {}

  @Post()
  create(@Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    return this.loyaltyProgramService.create(createLoyaltyProgramDto);
  }

  @Get()
  findAll() {
    return this.loyaltyProgramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyaltyProgramService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoyaltyProgramDto: UpdateLoyaltyProgramDto,
  ) {
    return this.loyaltyProgramService.update(+id, updateLoyaltyProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loyaltyProgramService.remove(+id);
  }
}
