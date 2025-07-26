import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    passwordPlain: string,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userService.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('Usuário com este e-mail já existe.');
    }

    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
    });

    const {password,...result} = newUser
    return result
  }
}
