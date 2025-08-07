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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra um novo user' })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 409, description: 'Email já em uso' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados para criar um novo user',
  })
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
  @ApiOperation({ summary: 'Realiza login e retorna token JWT' })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido e retorna token JWT',
    schema: {
      example: {
        access_token: 'string_do_jwt_aqui',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiBody({ type: LoginUserDto, description: 'Email e senha para login' })
  async login(
    @Request() req,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user as Omit<User, 'password'>);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Obtém os dados do usuário autenticado' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Dados de user',
    schema: {
      example: {
        userId: 'uuid-do-usuario',
        email: 'meuemail@exemplo.com',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado, token inválido' })
  getProfile(@Request() req): { userId: string; email: string } {
    return req.user;
  }
}
