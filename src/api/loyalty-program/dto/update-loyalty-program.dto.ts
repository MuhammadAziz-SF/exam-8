import { PartialType } from '@nestjs/swagger';
import { CreateLoyaltyProgramDto } from './create-loyalty-program.dto.js';

export class UpdateLoyaltyProgramDto extends PartialType(
  CreateLoyaltyProgramDto,
) {}
