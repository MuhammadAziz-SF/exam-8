import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    description: 'The ID of the ticket being paid for',
  })
  @IsUUID()
  @IsNotEmpty()
  ticketId: string;

  @ApiProperty({
    example: 199.99,
    description: 'The payment amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'USD',
    description: 'The currency of the payment',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    example: 'Credit Card',
    description: 'The method used for payment',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
