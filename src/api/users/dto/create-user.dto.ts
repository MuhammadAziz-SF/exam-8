import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'A12345678', description: 'User passport number' })
  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @ApiProperty({ example: 'American', description: 'User nationality' })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User date of birth (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
}
