import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findTasksOfUser(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async createTask(name: string, userId: string): Promise<Task> {
    return this.prisma.task.create({
      data: {
        name,
        userId,
      },
    });
  }

  async deleteTask(taskId: string): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async updateTaskState(taskId: string, newState: boolean): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        isChecked: newState,
      },
    });
  }
}
