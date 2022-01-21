import { CatsRepository } from './cats.repository';
import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

// nest g s cats : 서비스 생성

@Injectable()
// Injectable이 붙어있으면 provider라는 얘기
export class CatsService {
  // constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  // 여기서 @InjectModel(Cat.name) private readonly catModel: Model<Cat> 이거는 디비 자체를 직접적으로 인젝션 받지 않고
  // 레포지토리를 통해서 인젝션 받을 것이기 때문에 이거는 지우자
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('cats.service에서 보냄! 해당 고양이는 이미 존재합니다~~!!!');
      // UnauthorizedException 이 메소드로 하면 바로 403 에러 반환
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword
    });
    return cat.readOnlyData;
  }
  // 바디 자체는 디티오 타입으로 받는다
  // 회원가입 과정 자체는 1. 바디로 담겨온 데이터를 2. 유효성 검사를 수행하주고 3. 비번 암호화하고 4. 디비에 저장
  // 디비에 저장하려면 쿼리를 써야하고 이 스키마를 디비 안에서 쓰려면 의존성 주입을 해줘야 함
}
