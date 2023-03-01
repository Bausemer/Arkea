import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './DTOs/JwtPayload.dto';
import { LoginCredentials_DTO } from './DTOs/LoginCredentions.dto';

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
  ) { }

  async login (credentials: LoginCredentials_DTO): Promise<string> {

    const loginCredentials: LoginCredentials_DTO = {
      email: credentials.email || process.env.AZURE_USERNAME,
      password: credentials.password || process.env.AZURE_PASSWORD,
    }

    return await this.getToken(loginCredentials);
  }

  private async getToken (credentials: LoginCredentials_DTO): Promise<string> {
    const payload: JwtPayload = { username: credentials.email.substring(0, credentials.email.indexOf('@')) };
    return await this.jwtService.sign(payload);
  }
}
