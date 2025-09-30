import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    example: 'New York',
    description: 'The name of the city',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the country where the city is located',
  })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;
}
