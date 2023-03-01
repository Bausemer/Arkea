import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';

import { AzureADGuard } from './Auth.guard';
import { AuthService } from './auth.service';
import { LoginCredentials_DTO } from './DTOs/LoginCredentions.dto';

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) { }

  @Get()
  @UseGuards(AzureADGuard)
  getHello(): string {
    return 'Hello world!'
  }

  @Post('login')
  async login (
    @Body(ValidationPipe) credentials: LoginCredentials_DTO,
  ): Promise<string> {
    return this.authService.login(credentials);
  }
}
