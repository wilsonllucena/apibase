import { Controller, UseGuards, Request, Get, Post } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    if (!req?.user) {
      return new Error('User not found');
    }

    if (!req.user.email || !req.user.password) {
      return new Error('Email or password invalid');
    }

    return this.authService.login(req.user);
  }

  @Get('auth/logout')
  async logout() {
    return 'Logout';
  }
}
