import { Injectable } from '@nestjs/common';

// nest g s cats : 서비스 생성

@Injectable()
// Injectable이 붙어있으면 provider라는 얘기
export class CatsService {
  hiCatServiceProductt() {
    return 'cats.service 에서 보내는 거!!!';
  }
}
