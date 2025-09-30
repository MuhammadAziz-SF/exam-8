import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the plane this seat belongs to',
  })
  @IsUUID()
  @IsNotEmpty()
  planeId: string;

  @ApiProperty({
    example: '14A',
    description: 'The seat number',
  })
  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the travel class for this seat',
  })
  @IsUUID()
  @IsNotEmpty()
  classId: string;
}
