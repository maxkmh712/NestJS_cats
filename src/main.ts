import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 네스트팩토리??
  app.useGlobalPipes(new ValidationPipe());
  // 이걸 해줘야 class validation을 쓸 수 있음
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Cats example main.ts 에서 보냄')
    // 스웨거 제목
    .setDescription('The cats API description main.ts 에서 보냄')
    // 스웨거 설명
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // 이거 해줘야 스웨거로 바로 볼 수 있다
  // SwaggerModule.setup('docs', app, document); 여기서 docs는 엔드포인트! http://localhost:8000/docs

  

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
