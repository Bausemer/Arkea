import { IsEmail, IsString } from 'class-validator';

export class LoginCredentials_DTO {
  /** */
  @IsEmail(
    undefined,
    { message: 'Email or password is invalid!' }
  )
  email: string;
  /** */
  @IsString()
  password: string;
}
