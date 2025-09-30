import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    example: 'New Summer Destinations',
    description: 'The title of the news article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'We are excited to announce new flights to...',
    description: 'The main content of the news article',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
