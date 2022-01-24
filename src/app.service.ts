import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('app.service 에서 찍는 콘솔');
    return 'app.service 에서 보내는 Hello World!';
  }
}