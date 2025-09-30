import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { loyalty_levels } from 'src/common/enums';

export class CreateLoyaltyProgramDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the user',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 100, description: 'Initial points', required: false })
  @IsNumber()
  @IsOptional()
  points?: number;

  @ApiProperty({
    example: loyalty_levels.BRONZE,
    enum: loyalty_levels,
    required: false,
  })
  @IsEnum(loyalty_levels)
  @IsOptional()
  level?: loyalty_levels;
}
