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

    const cat = await this.catsRepositoy.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일 확인 플리즈! from auth.service')
    }


    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password
    )
    
    if (!isPasswordValidated) {
      throw new UnauthorizedException('비번 틀림!! from auth.service')
    }


    const payload = { email: email, sub: cat.id };
    
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
