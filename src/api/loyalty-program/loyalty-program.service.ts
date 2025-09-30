import { Injectable } from '@nestjs/common';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto.js';
import { UpdateLoyaltyProgramDto } from './dto/update-loyalty-program.dto.js';

@Injectable()
export class LoyaltyProgramService {
  create(createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    return 'This action adds a new loyaltyProgram';
  }

  findAll() {
    return `This action returns all loyaltyProgram`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loyaltyProgram`;
  }

  update(id: number, updateLoyaltyProgramDto: UpdateLoyaltyProgramDto) {
    return `This action updates a #${id} loyaltyProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} loyaltyProgram`;
  }
}
