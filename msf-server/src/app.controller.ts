import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  @HttpCode(204)
  health() {
    return;
  }
}
