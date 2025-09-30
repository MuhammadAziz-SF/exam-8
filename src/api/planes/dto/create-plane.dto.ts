import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePlaneDto {
  @ApiProperty({
    example: 'Boeing 737',
    description: 'The model of the plane',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: 189,
    description: 'The passenger capacity of the plane',
  })
  @IsInt()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the company that owns the plane',
  })
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}
