import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Hello World!' })
  @ApiResponse({
    status: 200,
    description: 'Hello World!',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
