import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreatBookDto {
  
  @ApiProperty({
    description: 'enter your title',
    example: 'myBook',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  title: string;

  @ApiProperty({
    description: 'enter your text',
    example: 'The best thing is Happiness',
  })
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'enter your author',
    example: 'behzad',
  })
  @MinLength(3)
  @MaxLength(12)
  @IsNotEmpty()
  author: string;
}
