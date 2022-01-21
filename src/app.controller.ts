import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller('')
// 여기 써준 cats는 엔드포인트임 http://localhost:8000/cats
export class AppController {
  // AppController를 소비자로 생각 AppServic를 제품이라고 생각하자
  // 소비자는 어떤 공급자로부터 AppService를 공급받아서 사용한다 => 맨마지막 리턴값 return this.appService.getHello(Body, param)
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}
  // 이 클래스 안에서 AppService를 사용할 수 있게 하는 것!
  // 소비자인 AppController가 공급자로부터 인스턴스인 AppService를 받아서 사용하는 것

  // 클래스 내부에서 생성자로 초기화 한 후에 appService 사용한 것
  // 그리고 constructor 함수 안에서 인자로 바로 받아서 사용 보통은 this.appService = appService 이렇게 사용했을것

  @Get('hello')
  // 여기 써주거는 http://localhost:8000/cats/hello 이렇게 보내야함. Get 메소드로 보낼때는 이렇게 해야댐
  // express에서 router.get 이라고 썼던 것을 이렇게 해주는 것. 데코레이터는 함수랑 붙여써야함
  getHello(
    @Req() req: Request,
    // @Param() param: { id: string; name: string },
    // @Body() Body,
    // 바디는 이렇게 { id: string; name: string } 가져오기보다 dto를 통해 그 안에서 validation 평가
    // dto는 바디의 속성을 정의해준다!
    ): string {
    // Req를 반드시 import 해오고 난 후에 req: Request 여기서 req가 변수이고 Request는 익스프레스에서 가져온 타입!
    // console.log(req);
    // 익스프레스에서 바디를 받아올때 const body = req.body 이렇게 받아왔었는데
    // 네스트에서는 바디를 바로 인자에서 받아올 수 있음
    // 파라미터도 req.params 이렇게 받을 수 있지만 이것도 바로 데코레이터로 불러올 수 있음
    // /:id 로 동적라우팅했을때 param이 그 id값이 되는 것 http://localhost:8000/cats/hello/maxkmh
    // hello/:id/:name name 까지 추가해도 다 받아올 수 있음
    // console.log(param)
    return this.catsService.hiCatServiceProductt();
    // 리턴값 getHello 함수에 Body, param를 보내서 사용할 수도 있음 여기는 컨트롤러이고 여기서 바디와 파라미터를 받아오는 것
  }
}

// nestjs에서의 컨트롤러가 express 라우트 역할
