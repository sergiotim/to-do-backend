import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  OmitType,
} from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { TaskService } from 'src/task/task.service';

@Controller('user')
export class UserController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('task/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra uma nova tarefa' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada',
    schema: {
      example: {
        name: 'Varrer a casa',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  createTask(@Request() req, @Body('name') name: string): Promise<Task> {
    return this.taskService.createTask(name, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('task')
  @ApiOperation({ summary: 'Obtém todas as tasks do usuário logado' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Tarefas do usuário',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado, token inválido',
  })
  findTasksOfUser(@Request() req): Promise<Task[]> {
    return this.taskService.findTasksOfUser(req.user.userId);
  }
}
