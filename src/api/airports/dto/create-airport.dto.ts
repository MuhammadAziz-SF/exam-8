import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAirportDto {
  @ApiProperty({
    example: 'John F. Kennedy International Airport',
    description: 'The name of the airport',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the city where the airport is located',
  })
  @IsUUID()
  @IsNotEmpty()
  cityId: string;

  @ApiProperty({ example: 123, description: 'The code of the airport' })
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
