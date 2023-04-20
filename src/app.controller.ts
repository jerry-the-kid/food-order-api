import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './common/decorator/roles.decorator';
import { Role } from './auth/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.Customer)
  getHello() {
    return this.appService.getHello();
  }
}
