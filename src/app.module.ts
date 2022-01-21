import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
// npm i --save @nestjs/config 설치하고 import 해야 .env 파일 사용 가능
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// 공홈 테크닉스 - 몽고 에서 npm install --save @nestjs/mongoose mongoose 설치 후 import해오자
import * as mongoose from "mongoose"

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
    CatsModule,
    AuthModule,],
  // .env 쓰려면 ConfigModule.forRoot() 있어야함
  // 현재 cats 모듈과 users 모듈이 있고 이 두개가 app 모듈에서 실행되고 그 app 모듈이 main에서 실행되는 것
  // 또한 CatsModule, UsersModule 여기서 exports 한 서비스들을 AppController, AppService 여기서 쓸 수 있는 것
  // cats.module.ts에서 exports 해놓은 CatsModule 가  app.module.ts에서 imports 되고 그러면 밑밑에 providers에서 따로 CatsService를 등록안해도 쓸 수 있다.
  controllers: [AppController],
  // 컨트롤러는 소비자
  // 이렇게 하면 AppController 여기서 AppService 이 안에 있는 것들을 쓸 수 있다.
  providers: [AppService],
  // CatsService 이렇게 등록을 해줘야
  // 이게 사업자 등록이라고 생각하면 쉬움
  // 프로바이더는 AppService 를 제공하는 공급자. 이걸 비워두면 컨트롤러에서 AppService를 사용할 수 없다
  // 공급자로 취급이 된 것들은 의존성 주입이 가능하다 @Injectable()
})
export class AppModule implements NestModule {
  // 여기서 NestModule은 인터페이스를 의미함
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .forRoutes('cats') 라고 쓰면 cats 라우터에 바인딩을 시켜주는 것
    // * 로 쓰면 와일드카드로 전체 엔드포인트에 대해서 LoggerMiddleware 가 실행이 되는 것
    mongoose.set('debug', true);
    // 이렇게 해주면 몽구스 쿼리가 찍힘
  }
}
