import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { flight_status } from 'src/common/enums';

export class CreateFlightDto {
  @ApiProperty({
    example: 1234,
    description: 'The flight number',
  })
  @IsNumber()
  @IsNotEmpty()
  flightNumber: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the plane for this flight',
  })
  @IsUUID()
  @IsNotEmpty()
  planeId: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the departure airport',
  })
  @IsUUID()
  @IsNotEmpty()
  departureAirport: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the arrival airport',
  })
  @IsUUID()
  @IsNotEmpty()
  arrivalAirport: string;

  @ApiProperty({
    example: '2024-08-15T10:00:00Z',
    description: 'The departure time in ISO 8601 format',
  })
  @IsDateString()
  @IsNotEmpty()
  departureTime: Date;

  @ApiProperty({
    example: '2024-08-15T14:00:00Z',
    description: 'The arrival time in ISO 8601 format',
  })
  @IsDateString()
  @IsNotEmpty()
  arrivalTime: Date;

  @ApiProperty({ example: flight_status.SCHEDULED, enum: flight_status })
  @IsEnum(flight_status)
  @IsNotEmpty()
  status: flight_status;
}
