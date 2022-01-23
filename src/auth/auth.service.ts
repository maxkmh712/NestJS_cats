import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // 어스 서비스를 구현한 다음에 cats.controller에서 의존성주입을 통해서 리턴을 해줄 것
  constructor (
    //cat의 종속성 주입을 해주어야 함
    private readonly catsRepositoy: CatsRepository,
    private jwtService: JwtService,
    ) {}
 
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    // 로그인할때 이메일과 비번이 필요하고 이 두개를 통해서 해당하는 정보가 디비에 있는지 확인
    // 디비에 존재하는 유저와 들어온 비번을 비교한다
    // 이메일 비번 유효성 검증이 다 통과가 되면
    // 리턴으로 jwt 토큰 반환해주는 것

    // 해당하는 email이 있는지
    const cat = await this.catsRepositoy.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비번을 확인해주세요 from auth.service')
    }

    // password 가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password
    )
    
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비번을 확인해주세요 from auth.service')
    }

    const payload = { email: email, sub: cat.id };
    //sub는 토큰 제목. 여기에 cat의 id를 넣는것

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
