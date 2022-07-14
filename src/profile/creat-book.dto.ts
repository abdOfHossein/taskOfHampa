import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreatBookDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  title: string;

  @IsNotEmpty()
  text: string;

  @MinLength(3)
  @MaxLength(12)
  @IsNotEmpty()
  author: string;
}
