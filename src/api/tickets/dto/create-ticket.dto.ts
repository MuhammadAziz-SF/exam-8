import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the flight for this ticket',
  })
  @IsUUID()
  @IsNotEmpty()
  flightId: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the user booking the ticket',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the seat for this ticket',
  })
  @IsUUID()
  @IsNotEmpty()
  seatId: string;

  @ApiProperty({
    example: 250.5,
    description: 'The price of the ticket',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'USD',
    description: 'The currency of the price',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;
}
