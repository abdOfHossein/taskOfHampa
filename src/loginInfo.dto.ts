import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoDto {
  @ApiProperty({
    description: 'enter your userName',
    example: 'behzad',
  })
  username: string;

  @ApiProperty({
    description: 'enter your password',
    example: '12345J*j',
  })
  password: string;
}
