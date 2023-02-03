import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RedisService } from '~libs/Redis/Redis.service';

import { JwtPayload } from './DTOs/JwtPayload.dto';
import { LoginCredentials_DTO } from './DTOs/LoginCredentials.dto';
import { User } from './DTOs/User.dto';

@Injectable()
export class LoginService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly redis: RedisService<string, User>,
  ) {}
  
  async login (credentials: LoginCredentials_DTO): Promise<string> {

    const loginCredentials: LoginCredentials_DTO = {
      email: credentials.email || process.env.AUTH_USERNAME,
      password: credentials.password || process.env.AUTH_PASSWORD,
    }

    const user = await this.getUser(loginCredentials);

    if(!user)
      throw new UnauthorizedException('Invalid credentials!');

    const token = await this.getToken(loginCredentials, user);

    return token;
  }


  private async getUser (credentials: LoginCredentials_DTO): Promise<User>{
     
    // getting user from postgres db 

    return null;     
  }

  private async getToken (credentials: LoginCredentials_DTO, user: User): Promise<string> {

    const payload: JwtPayload = { username: credentials.email.substring(0, credentials.email.indexOf('@')) };

    this.redis.setCacheData(payload.username, user);

    const token = await this.jwtService.sign(payload);

    return token;
  }
}
