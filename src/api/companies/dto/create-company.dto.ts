import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Delta Air Lines',
    description: 'The name of the airline company',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'United States',
    description: 'The country of origin for the company',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
