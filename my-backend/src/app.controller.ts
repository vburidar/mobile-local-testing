import { Controller, Get } from '@nestjs/common';
import { AppService, MyHello } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<MyHello> {
    return Promise.resolve(this.appService.getHello());
  }
}
