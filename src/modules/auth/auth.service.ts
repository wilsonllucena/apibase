import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) {
      const { _id, name, email } = user;
      return { id: _id, name, email };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.name,
      username: user.email,
      sub: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.name,
        username: user.email,
      },
    };
  }
}
