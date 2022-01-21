import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    private readonly catsRepositoy: CatsRepository,
    private jwtService: JwtService,
    ) {}
 
  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

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

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
