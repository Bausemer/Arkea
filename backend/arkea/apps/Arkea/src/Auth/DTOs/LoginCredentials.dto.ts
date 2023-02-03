import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentials_DTO {
  /** */
  @IsEmail(
    undefined,
    { message: 'Email or password is invalid!' }
  )
  @ApiProperty()
  email: string;
  /** */
  @IsString()
  @ApiProperty()
  password: string;
}
