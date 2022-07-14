import {  IsNotEmpty, IsPhoneNumber, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  userName: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:"password must beMinimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"})
  @IsNotEmpty()
  @MinLength(8)
  password:string

  @MinLength(3)
  @MaxLength(12)
  @IsNotEmpty()
  firstName: string;

  @MinLength(3)
  @MaxLength(12)
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber('IR')
  @IsNotEmpty()
  phoneNumber: string;
}
