import { PositiveIntPipe } from './../common/pipes/positiveint.pipe';
import { Controller, Delete, Get, Patch, Post, Put, HttpException, UseFilters, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

// nest g co cats : 컨트롤러 생성 => 바로 module에 추가됨

// 컨트롤러는 라우터 역할이고 서비스에서 로직 작성
@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
// SuccessInterceptor를 의존성 주입을 해주자
export class CatsController {
  // 서비스를 의존성 주입하는 방법 ↓
  constructor(private readonly catsService: CatsService) {}
  // CatsController라는 소비자가 CatsService라는 상품을 주입받은 것

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter)
  // 전역 필터로 main.ts에서 써주기 때문에 불필요
  getAllCat() {
    throw new HttpException('에러에러에러!!!', 401)
    // 여기서 발생된 exception이 필터링되서 reponse에 전달되는 것
    // 여기 에러와 코드를 받으려면 exception.message 또는 exception.status
    return ' all cat';
  }

  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    // 파라미터 Id를 받으면 ParseIntPipe 여기를 먼저 거치고 나온 값을 PositiveIntPipe 여기로 또 보냄 
    // 그렇게 파이프들을 쭉 타고 가서 마지막으로 결과값인 param을 받는 것!
    console.log(param);

    // @Param('') 이렇게 찍어보면 { id: '12' } 이렇게 오브젝트 형식으로 찍힘
    // @Param('id') 근데 이렇게 찍으면 value 값인 12 만 찍힘
    // pipe를 통해서 id가 들어왔을 때 number로 타입 변환을 해줄 수가 있음 
    // @Param('id', ParseIntPipe) 이렇게 하면 id를 숫자형으로 받을 수 있고 
    // 문자형이 id값으로 들어오면 에러처리도 자동으로 가능
    return 'one cat';
  }


}

// ⭐️  app.controller와 cats.controller 비교!
// 두가지 중에서 app.controller가 우선한다!


// ⭐️  파이프란?
// 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 
// 데이터를 얻을 수 있도록 도와주는 클래스
// 왜 파이프로 이름을 지었나? -> 


// ⭐️  인터셉터란?
//  각각의 컨트롤러들을 횡단을 하면서 재사용성이 가능한 기능들을 하나의 모듈로 묶는 것 (관점지향적)