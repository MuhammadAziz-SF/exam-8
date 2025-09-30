import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    example: 'Business',
    description: 'The name of the travel class',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Comfortable seating with extra legroom and premium services.',
    description: 'A brief description of the travel class',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
