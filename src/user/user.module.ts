import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { TaskModule } from 'src/task/task.module';

@Module({
  providers: [UserService],
  exports:[UserService],
  imports:[PrismaModule,TaskModule],
  controllers: [UserController]
})
export class UserModule {}
