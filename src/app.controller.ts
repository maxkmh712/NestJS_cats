import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CatsService } from './cats/service/cats.service';

@Controller('')
export class AppController {
  constructor( private readonly appService: AppService ) {}

  @Get('hello')
  getHello( @Req() req: Request): string {
    return this.appService.getHello();
  }
}