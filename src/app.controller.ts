import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { AppService, Greetings } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): Greetings {
    return this.appService.greetings();
  }

  @Get('status')
  @HttpCode(200)
  getStatus() {
    return this.appService.status();
  }

  @Get('health')
  @HealthCheck()
  healthCheck() {
    return this.appService.healthCheck();
  }
}
