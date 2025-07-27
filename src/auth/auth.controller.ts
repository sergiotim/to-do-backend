import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const { email, password } = createUserDto;
    const newUserWithoutPassword = await this.authService.register(
      email,
      password,
    );

    return newUserWithoutPassword;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user as Omit<User, 'password'>);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req): { userId: string; email: string } {
    return req.user;
  }
}
