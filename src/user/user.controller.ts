import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
import { TaskService } from 'src/task/task.service';

@Controller('user')
export class UserController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTask(@Request() req, @Body('name') name: string): Promise<Task> {
    return this.taskService.createTask(name, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findTasksOfUser(@Request() req): Promise<Task[]> {
    return this.taskService.findTasksOfUser(req.user.userId);
  }
}
