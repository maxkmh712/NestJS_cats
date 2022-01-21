import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 네스트팩토리??
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  // listen의 첫번째 인자에서 포트를 설정해줄 수 있음
  await app.listen(PORT);
}
bootstrap();

// 여기서 bootstrap이 실행되면서

// 이 main.ts가 최종적으로 실행되면 여기 안에 bootstrap이 실행이 되고
// 그러면 app 이 실행이 되고 이 app는 AppModule로 만들어졌고
// AppModule은 './app.module' 여기서 온거고
// 앱모듈에서 컨트롤러가 존재하고 앱컨트롤러로 들어가면 getHello 함수가 실행됨
