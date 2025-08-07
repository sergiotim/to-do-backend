import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Altera o status da tarefa',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Tarefa com status alterado',
    schema: {
      example: {
        id: 'id-da-tarefa',
        newStatus: true,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado, token inválido',
  })
  updateTaskState(
    @Body('id') id: string,
    @Body('newStatus') newStatus: boolean,
  ): Promise<Task> {
    return this.taskService.updateTaskState(id, newStatus);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
