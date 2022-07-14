import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'enter your userName',
    example: 'behzad',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  userName: string;

  @ApiProperty({
    description: 'enter your password',
    example: '12365H&h',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'password must beMinimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'enter your firstName',
    example: 'behzad',
  })
  @MinLength(3)
  @MaxLength(12)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'enter your lastName',
    example: 'shafiee',
  })
  @MinLength(3)
  @MaxLength(12)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'enter your phoneNumber',
    example: '09158547725',
  })
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  phoneNumber: string;
}
