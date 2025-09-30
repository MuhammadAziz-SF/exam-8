import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class FlightSearchDto {
  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the departure airport',
  })
  @IsUUID()
  @IsOptional()
  departureAirport?: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the arrival airport',
  })
  @IsUUID()
  @IsOptional()
  arrivalAirport?: string;

  @ApiPropertyOptional({
    example: '2024-08-15',
    description: 'The departure date (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsOptional()
  date?: string;
}
