import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('app.service 에서 보내는 하이하이!!!!');
    return 'app.service 에서 보내는 Hello World!';
    // 이 리턴값이 앱.컨트롤러 로 가서 getHello() 함수의 리턴값으로 반환
  }
}

// 여기 안에서 비즈니스 로직이 실행되는 것 여기 있는 리턴값이 컨트롤러에서 리턴값으로 나오고 ;
// 그게 모듈로 들어가게 되고 ;
// 이 모듈이 NestFactory 로 들어가게 됨;
